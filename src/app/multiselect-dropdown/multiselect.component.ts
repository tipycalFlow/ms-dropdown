import { Component, OnInit, NgModule, OnChanges, ViewEncapsulation,forwardRef, Input, Output, EventEmitter, ElementRef, AfterViewInit, Pipe, PipeTransform } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CommonModule } from '@angular/common';

export const DROPDOWN_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AngularMultiSelect),
    multi: true
};
export class ListItem {
    id: String;
    itemName: String
}
const noop = () => {
};

@Component({
    selector:'ms-dropdown',
    templateUrl: './multiselect.component.html',
    styleUrls: ['./multiselect.component.scss'],
    providers: [DROPDOWN_CONTROL_VALUE_ACCESSOR]
})

export class AngularMultiSelect implements ControlValueAccessor {

    @Input() 
    data: Array<ListItem>;

    @Input()
    displayText: String;

    @Input()
    searchPlaceholderText: String;

    @Output('onSelect')
    onSelect: EventEmitter<ListItem> = new EventEmitter<ListItem>();

    @Output('onDeSelect')
    onDeSelect: EventEmitter<ListItem> = new EventEmitter<ListItem>();

    public selectedItems: Array<ListItem>;
    public isExpanded: boolean = false;
    filter: ListItem = new ListItem();

    constructor(){ }

    onItemClick(item: ListItem, index: number){
        let found = this.isSelected(item);
        if(!found){
            this.addSelected(item);
            this.onSelect.emit(item);
        } else {
            this.removeSelected(item);
            this.onDeSelect.emit(item);
        }   
    }
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    writeValue(value: any) {
        if (value !== undefined && value !== null) {
            this.selectedItems = value;
        } else {
            this.selectedItems = [];
        }
    }
    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }
    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
    trackByFn(index: number, item: ListItem) {
        return item.id;
    }
    isSelected(clickedItem:ListItem) {
        let found = false;
        this.selectedItems && this.selectedItems.forEach(item => {
           if(clickedItem.id === item.id){
               found = true;
           }
        });
        return found;
    }
    addSelected(item: ListItem) {
        this.selectedItems.push(item);
        this.onChangeCallback(this.selectedItems);
    }
    removeSelected(clickedItem: ListItem) {
        this.selectedItems && this.selectedItems.forEach(item => {
           if(clickedItem.id === item.id){
               this.selectedItems.splice(this.selectedItems.indexOf(item),1);
           }
        });
        this.onChangeCallback(this.selectedItems);
    }
    toggleDropdown(evt: any) {
        this.isExpanded = !this.isExpanded;
        evt.preventDefault();
    }
    closeDropdown() {
        this.isExpanded = false;
    }
}

@Pipe({
    name: 'listFilter',
    pure: false
})
export class ListFilterPipe implements PipeTransform {
    transform(items: ListItem[], filter: ListItem): ListItem[] {
        if (!items || !filter) {
            return items;
        }
        return items.filter((item: ListItem) => this.applyFilter(item, filter));
    }

    applyFilter(item: ListItem, filter: ListItem): boolean {
        return !(filter.itemName && item.itemName && item.itemName.toLowerCase().indexOf(filter.itemName.toLowerCase()) === -1);
    }
}

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [AngularMultiSelect, ListFilterPipe],
  exports: [AngularMultiSelect, ListFilterPipe]
})
export class MultiSelectModule { }

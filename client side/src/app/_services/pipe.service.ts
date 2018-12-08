import { Pipe, PipeTransform } from '@angular/core';
import { Productservice, Category } from '@app/_models';


@Pipe({
  name: 'filter',
  pure: false
})


export class FilterPipe implements PipeTransform {
  filter1: Productservice[];

  transform(items: Productservice[], searchText: string , filteritems:Category[], isAnd: boolean): Productservice[] {
    if(!items) return [];
    let checkedItems = filteritems.filter(item => { return item.checked; });
    if(!searchText && filteritems.length == 0) return items;

    else if(searchText && filteritems.length == 0)
    {
    this.filter1 =  items.filter( (it:Productservice) => {
      return it.pname.includes(searchText);
    });

    return this.filter1;
   }


   else if(!searchText && filteritems.length != 0)
   {
      return items.filter(item => {
        return checkedItems.some((checkedItem) => {
          return String(item.categoryid).includes(String(checkedItem.id));
        });
      });
  }

  else if(searchText && filteritems.length != 0)
  {
    this.filter1 =  items.filter( (it:Productservice) => {
      return it.pname.includes(searchText);
    });

    return this.filter1.filter(item => {
      return checkedItems.some((checkedItem) => {
        return String(item.categoryid).includes(String(checkedItem.id));
      });
    });
  }
/*
   else if(searchText && filteritems.length != 0)
   {
     this.filter1 =  items.filter( (it:Productservice) => {
       return it.pname.includes(searchText);

     return filter1.filter( (it:Productservice) => {
       return (it.categoryid === filteritems.id);
   }*/
 }
}

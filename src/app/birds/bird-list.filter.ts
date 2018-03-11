import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'listFilter', pure: false })
export class BirdListFilter implements PipeTransform {

    transform(items: Array<any>, filterBy: string, isField: boolean, field: string, objectName?: string): Array<string> {
        console.log('Filtering on ' + field + ' on value :' + filterBy);

        if (!items) {
            return [];
        } else if ((!filterBy) || (filterBy.length === 0)) {
            return items;
        } else {
            const filterLowerCase = filterBy.toLowerCase();
            return items.filter(
                (v) => {
                    if (isField) {
                        return v[field].toLowerCase().indexOf(filterLowerCase) !== -1;
                    } else {
                        return v[objectName][field].toLowerCase().indexOf(filterLowerCase) !== -1;
                    }
                });
        }
    }
}

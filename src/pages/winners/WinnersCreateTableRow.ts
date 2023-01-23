import { Component } from '../../components/elements/Component';
import { getCarSvg } from '../../common/utils';

export class WinnersCreateTableRow extends Component {
  private rowDataArr: [number, number, string, string, number, number];
  constructor(personalNumber: number, id: number, carColor: string, carName: string, wins: number, time: number) {
    super({tag: 'tr', className: 'table__row'});
    this.rowDataArr = [personalNumber, id, carColor, carName, wins, time];
    this.fillRow();
  }
  fillRow(){
    this.rowDataArr.forEach((el, index) => {
      if(index === 2 && typeof el === 'string'){
        const td = new Component({
          tag: 'td',
          className: 'table__row-data',
          innerHTML: getCarSvg(el),
        });
        this.node.append(td.node);
      }else {
        const td = new Component({
          tag: 'td',
          className: 'table__row-data',
          textContent: `${el}`,
        });
        this.node.append(td.node);
      }
    });
  }
}
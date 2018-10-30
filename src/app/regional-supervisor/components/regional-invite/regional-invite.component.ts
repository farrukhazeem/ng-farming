import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-regional-invite',
  templateUrl: './regional-invite.component.html',
  styleUrls: ['./regional-invite.component.css']
})
export class RegionalInviteComponent implements OnInit {

  title = 'angular2-collapsible Demo';
  
    loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore` +
    ` magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ` +
    `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ` +
    `Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
    loremIpsumSmall = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, ` +
    `sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;
  
    collapsibleType = 'accordion';
    collapsibleTypeAccordion = true;
  
    activeTab = 1;
  
    listItems = [{
      desc: 'item 1',
      expanded: true
    }, {
      desc: 'item 2',
      expanded: false
    }, {
      desc: 'item 3'
    }];
  
    tableItems = {
      header: [
        { desc: 'Supervisor Name' },
        { desc: 'Grower Name' },
        { desc: 'Invite ID' },
        { desc: 'Checkbox' },
      ],
      data: [
        ['Larry', 'Bishop', 'lbishop0@walmart.com'],
        ['Eugene', 'King', 'eking1@cam.ac.uk'],
        ['Kelly', 'Anderson', 'kanderson2@so-net.ne.jp'],
        ['Eugene', 'Grant', 'egrant3@senate.gov'],
        ['Shirley', 'Kennedy', 'skennedy4@istockphoto.com'],
        ['Shawn', 'Frazier', 'sfrazier5@shinystat.com'],
        ['Lawrence', 'Gutierrez', 'lgutierrez6@purevolume.com'],
        ['Craig', 'Howard', 'choward7@discuz.net'],
        ['Ronald', 'Torres', 'rtorres8@addthis.com'],
        ['Amanda', 'Wheeler', 'awheeler9@photobucket.com']
      ]
    };
  
    bordered = false;
    borderedHorizontally = false;
    borderedVertically = false;
    striped = true;
    stripedOddColor = 'rgba(242,242,242,0.8)';
    stripedOddTextColor = 'black';
    stripedEvenColor = 'transparent';
    stripedEvenTextColor = 'black';
    highlight = false;
    highlightColor = 'rgba(222,222,222, 0.8)';
    highlightTextColor = 'black';
    activeColor = 'rgba(212,212,212, 0.8)';
    activeTextColor = 'black';
    centered = false;
    select = false;
    selectMultipleRows = false;
    selectColor = 'rgba(212,212,212, 0.8)';
    selectTextColor = 'black';
    allowDeselectingRows = false;
    allowKeyboardNavigation = true;
    noTextSelect = false;
  
    tableOptions = [
      { title: 'bordered', checked: this.bordered },
      { title: 'borderedHorizontally', checked: this.borderedHorizontally },
      { title: 'borderedVertically', checked: this.borderedVertically },
      { title: 'striped', checked: this.striped },
      { title: 'stripedOddColor' },
      { title: 'stripedOddTextColor' },
      { title: 'stripedEvenColor' },
      { title: 'stripedEvenTextColor' },
      { title: 'highlight', checked: this.highlight },
      { title: 'highlightColor' },
      { title: 'highlightTextColor' },
      { title: 'activeColor' },
      { title: 'activeTextColor' },
      { title: 'centered', checked: this.centered },
      { title: 'select', checked: this.select },
      { title: 'selectMultipleRows', checked: this.selectMultipleRows },
      { title: 'selectColor' },
      { title: 'selectTextColor' },
      { title: 'allowDeselectingRows', checked: this.allowDeselectingRows },
      { title: 'allowKeyboardNavigation', checked: this.allowKeyboardNavigation },
      { title: 'noTextSelect', checked: this.noTextSelect }
    ];
  

  constructor() { }
  changeCollapsibleType(): void {
    this.collapsibleTypeAccordion = !this.collapsibleTypeAccordion;
    if (this.collapsibleTypeAccordion) {
      this.collapsibleType = 'accordion';
    } else {
      this.collapsibleType = 'expandable';
    }
  }

  tableTabClicked() {
    this.activeTab = 1;
    setTimeout(() => {
      (<any>window).Materialize.updateTextFields();
    }, 0);
  }

  typeOf(str: string): string {
    if (str.toLowerCase().endsWith('color')) {
      return 'string';
    } else {
      return 'boolean';
    }
  }

  getOption(option: string): string {
    switch (option) {
      case 'stripedOddColor': return this.stripedOddColor;
      case 'stripedOddTextColor': return this.stripedOddTextColor;
      case 'stripedEvenColor': return this.stripedEvenColor;
      case 'stripedEvenTextColor': return this.stripedEvenTextColor;
      case 'highlightColor': return this.highlightColor;
      case 'highlightTextColor': return this.highlightTextColor;
      case 'activeColor': return this.activeColor;
      case 'activeTextColor': return this.activeTextColor;
      case 'selectColor': return this.selectColor;
      case 'selectTextColor': return this.selectTextColor;
      default:
        return 'null';
    }
  }

  setOption(option: string, value: any): void {
    switch (option) {
      case 'bordered': this.bordered = value; break;
      case 'borderedHorizontally': this.borderedHorizontally = value; break;
      case 'borderedVertically': this.borderedVertically = value; break;
      case 'striped': this.striped = value; break;
      case 'highlight': this.highlight = value; break;
      case 'select': this.select = value; break;
      case 'selectMultipleRows': this.selectMultipleRows = value; break;
      case 'centered': this.centered = value; break;
      case 'allowDeselectingRows': this.allowDeselectingRows = value; break;
      case 'allowKeyboardNavigation': this.allowKeyboardNavigation = value; break;
      case 'noTextSelect': this.noTextSelect = value; break;
      case 'stripedOddColor': this.stripedOddColor = value; break;
      case 'stripedOddTextColor': this.stripedOddTextColor = value; break;
      case 'stripedEvenColor': this.stripedEvenColor = value; break;
      case 'stripedEvenTextColor': this.stripedEvenTextColor = value; break;
      case 'highlightColor': this.highlightColor = value; break;
      case 'highlightTextColor': this.highlightTextColor = value; break;
      case 'activeColor': this.activeColor = value; break;
      case 'activeTextColor': this.activeTextColor = value; break;
      case 'selectColor': this.selectColor = value; break;
      case 'selectTextColor': this.selectTextColor = value; break;
    }
  }

  inputDisabled(option: string): boolean {
    switch (option) {
      case 'stripedOddColor':
      case 'stripedOddTextColor':
      case 'stripedEvenColor':
      case 'stripedEvenTextColor':
        return this.striped ? null : true;
      case 'highlightColor':
      case 'highlightTextColor':
        return this.highlight ? null : true;
      case 'selectColor':
      case 'selectTextColor':
        return this.select ? null : true;
    }
  }




  ngOnInit() {
  }

}

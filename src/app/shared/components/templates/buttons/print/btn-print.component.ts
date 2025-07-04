import { Component, Input, OnInit } from '@angular/core';
import { LBL_DISPLAY } from '../../../../../core/custom/constants';

@Component({
    selector: 'app-btn-print',
    templateUrl: './btn-print.component.html',
})
export class BtnPrintComponent implements OnInit {
    @Input() disabled: boolean | undefined;
    @Input() color: string | undefined;
    @Input() text: string | undefined;

    constructor() {
    }

    ngOnInit(): void {
        this.text = this.text ?? LBL_DISPLAY.add;
        this.disabled  = this.disabled ?? false;
        this.color = this.color ?? 'primary';
    }
}

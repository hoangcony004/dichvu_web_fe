import { Component, Input, OnInit } from '@angular/core';
import { LBL_DISPLAY } from '../../../../../core/custom/constants';

@Component({
    selector: 'app-btn-refresh',
    templateUrl: './btn-refresh.component.html',
})
export class BtnRefreshComponent implements OnInit {
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

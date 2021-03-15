import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import * as tinycolor from 'tinycolor2';

@Component({
    selector: 'colorpicker-dialog',
    templateUrl: './colorpicker-dialog.component.html',
    styleUrls: ['./colorpicker-dialog.component.scss']
})
export class ColorpickerDialogComponent implements OnInit {

    @Output() result: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild("spectrumCanvas", { static: true }) spectrumCanvas: ElementRef<HTMLCanvasElement>;
    @ViewChild("spectrumCursor", { static: true }) spectrumCursor: ElementRef<HTMLCanvasElement>;
    @ViewChild("hueCursor", { static: true }) hueCursor: ElementRef<HTMLCanvasElement>;
    @ViewChild("hueCanvas", { static: true }) hueCanvas: ElementRef<HTMLCanvasElement>;

    rgbForm: FormGroup;
    hslForm: FormGroup;

    spectrumCtx;
    spectrumRect;
    hueCtx;
    hueRect;

    currentColor = '';
    hue = 0;
    saturation = 1;
    lightness = .5;

    moveSpectrum = false;
    moveHue = false;

    basicColors = [
        '#3498db',
        '#913d88',
        '#f39c12',
        '#6c7a89',
        '#1e824c',
        '#23a085',
        '#9b59b6',
        '#d35400',
        '#c0392b'
    ];

    customColors = Array(18).fill('#f2f2f2');

    constructor(private fb: FormBuilder) { }

    createCanvas() {
        this.spectrumCtx = this.spectrumCanvas.nativeElement.getContext('2d');
        this.spectrumRect = this.spectrumCanvas.nativeElement.getBoundingClientRect();
        this.hueCtx = this.hueCanvas.nativeElement.getContext('2d');
        this.hueRect = this.hueCanvas.nativeElement.getBoundingClientRect();
    }

    createRGBForm() {
        this.rgbForm = this.fb.group({
            r: [255],
            g: [255],
            b: [255]
        });
    }

    createHSLForm() {
        this.hslForm = this.fb.group({
            h: [0],
            s: [0],
            l: [100],
        });
    }

    onColorChange() {
        this.rgbForm.valueChanges
            .subscribe(({ r, g, b }) => {
                const color = tinycolor(`rgb ${r} ${g} ${b}`);
                this.colorToPos(color);
            });

        this.hslForm.valueChanges
            .subscribe(({ h, s, l }) => {
                const color = tinycolor(`hsl ${h} ${s} ${l}`);
                this.colorToPos(color);
            });
    }

    updateForm(formName: string, value: any) {
        this[formName].patchValue(value);
    }

    getHSL(value) {
        const hslColorData = value.toHslString().split('hsl(')[1].split(',').map(v => parseInt(v));
        return { h: Math.floor(hslColorData[0]), s: hslColorData[1], l: hslColorData[2] }
    }

    ngOnInit() {
        this.createRGBForm();
        this.createHSLForm();
        this.createCanvas();
        this.createShadeSpectrum();
        this.createHueSpectrum();
        this.onColorChange();
        this.colorToPos(this.currentColor);
        this.setCurrentColor(this.currentColor);
    }

    selectColor(color: string) {
        this.currentColor = color;
        this.colorToPos(color);
        const _color = tinycolor(this.currentColor);
        this.updateForm('rgbForm', _color.toRgb());
        this.updateForm('hslForm', this.getHSL(_color));
    }

    addCustomColor() {

    }

    createShadeSpectrum(color?: string) {
        const canvas = this.spectrumCanvas.nativeElement;
        const ctx = this.spectrumCtx;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!color) color = '#f00';
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        var whiteGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        whiteGradient.addColorStop(0, "#fff");
        whiteGradient.addColorStop(1, "transparent");
        ctx.fillStyle = whiteGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        var blackGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        blackGradient.addColorStop(0, "transparent");
        blackGradient.addColorStop(1, "#000");
        ctx.fillStyle = blackGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    createHueSpectrum() {
        const canvas = this.hueCanvas.nativeElement;
        const ctx = this.hueCtx;
        const hueGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        hueGradient.addColorStop(0.00, "hsl(0,100%,50%)");
        hueGradient.addColorStop(0.17, "hsl(298.8, 100%, 50%)");
        hueGradient.addColorStop(0.33, "hsl(241.2, 100%, 50%)");
        hueGradient.addColorStop(0.50, "hsl(180, 100%, 50%)");
        hueGradient.addColorStop(0.67, "hsl(118.8, 100%, 50%)");
        hueGradient.addColorStop(0.83, "hsl(61.2,100%,50%)");
        hueGradient.addColorStop(1.00, "hsl(360,100%,50%)");
        ctx.fillStyle = hueGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    startGetHueColor(e) {
        this.getHueColor(e);
        this.hueCursor.nativeElement.classList.add('dragging');
        this.moveHue = true;
    };

    endGetHueColor(e) {
        this.hueCursor.nativeElement.classList.remove('dragging');
        this.moveHue = false;
    };

    getHueColor(e) {
        e.preventDefault();
        let y = e.pageY - this.hueRect.top;
        if (y > this.hueRect.height) { y = this.hueRect.height };
        if (y < 0) { y = 0 };
        const percent = y / this.hueRect.height;
        this.hue = 360 - (360 * percent);
        const hueColor = tinycolor('hsl ' + this.hue + ' 1 .5').toHslString();
        const color = tinycolor('hsl ' + this.hue + ' ' + this.saturation + ' ' + this.lightness).toHslString();
        this.createShadeSpectrum(hueColor);
        this.updateHueCursor(y)
        this.setCurrentColor(color);
    };

    updateHueCursor(y) {
        this.hueCursor.nativeElement.style.top = y + 'px';
    }

    getMoveCuursor(event) {
        if (this.moveSpectrum) {
            this.getSpectrumColor(event);
        }
        if (this.moveHue) {
            this.getHueColor(event);
        }
    }

    getUpCuursor(event) {
        if (!this.moveSpectrum) {
            this.endGetHueColor(event);
        }
        if (!this.moveHue) {
            this.endGetSpectrumColor(event);
        }
        const color = tinycolor(this.currentColor);
        this.updateForm('rgbForm', color.toRgb());
        this.updateForm('hslForm', this.getHSL(color));
    }

    startGetSpectrumColor(e): any {
        this.getSpectrumColor(e);
        this.spectrumCursor.nativeElement.classList.add('dragging');
        this.moveSpectrum = true;
    };

    endGetSpectrumColor(e) {
        this.moveSpectrum = false;
        this.spectrumCursor.nativeElement.classList.remove('dragging');
    };

    getSpectrumColor(e) {
        e.preventDefault();
        let x = e.pageX - this.spectrumRect.left;
        let y = e.pageY - this.spectrumRect.top;
        //constrain x max
        if (x > this.spectrumRect.width) { x = this.spectrumRect.width }
        if (x < 0) { x = 0 }
        if (y > this.spectrumRect.height) { y = this.spectrumRect.height }
        if (y < 0) { y = .1 }
        //convert between hsv and hsl
        const xRatio = x / this.spectrumRect.width * 100;
        const yRatio = y / this.spectrumRect.height * 100;
        const hsvValue = 1 - (yRatio / 100);
        const hsvSaturation = xRatio / 100;
        this.lightness = (hsvValue / 2) * (2 - hsvSaturation);
        this.saturation = (hsvValue * hsvSaturation) / (1 - Math.abs(2 * this.lightness - 1));
        const color = tinycolor('hsl ' + this.hue + ' ' + this.saturation + ' ' + this.lightness);
        this.setCurrentColor(color);
        this.updateSpectrumCursor(x, y);
        console.log(x);
        console.log(y);
    };

    setCurrentColor(color) {
        color = tinycolor(color);
        this.currentColor = color;
        this.spectrumCursor.nativeElement.style.backgroundColor = color;
        this.hueCursor.nativeElement.style.backgroundColor = 'hsl(' + color.toHsl().h + ', 100%, 50%)';
    };

    updateSpectrumCursor(x, y) {
        this.spectrumCursor.nativeElement.style.left = x + 'px';
        this.spectrumCursor.nativeElement.style.top = y + 'px';
    };

    colorToHue(_color) {
        let color = tinycolor(_color);
        const hueString = tinycolor('hsl ' + color.toHsl().h + ' 1 .5').toHslString();
        return hueString;
    };

    colorToPos(_color) {
        const color = tinycolor(_color);
        const hsl = color.toHsl();
        this.hue = hsl.h;
        const hsv = color.toHsv();
        const x = this.spectrumRect.width * hsv.s;
        const y = this.spectrumRect.height * (1 - hsv.v);
        const hueY = this.hueRect.height - ((this.hue / 360) * this.hueRect.height);
        this.updateSpectrumCursor(x, y);
        this.updateHueCursor(hueY);
        this.setCurrentColor(color);
        this.createShadeSpectrum(this.colorToHue(color));
    };

    save() {
        const result = tinycolor(this.currentColor).toHexString();
        this.result.emit(result);
    }

    cancel() {
        this.result.emit('');
    }

}

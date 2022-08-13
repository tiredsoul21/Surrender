/* Copyright - License

    bentKnee is true Open Source/Free Software and meet all definitions as such.
    It means that you are free to modify and redistribute all contents of the UI.
    You may also freely use bentKnee in your commercial projects.

    COPYRIGHT AND PERMISSION NOTICE

    Copyright (C) 2022, Derrick Cox,
    All rights reserved.

    Permission to use, copy, modify, and distribute this software for any purpose with
    or without fee is hereby granted, provided that the above copyright notice and this
    permission notice appear in all copies.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
    INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
    PARTICULAR PURPOSE AND NONINFRINGEMENT OF THIRD PARTY RIGHTS. IN NO EVENT SHALL
    THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
    WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
    WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

    Except as contained in this notice, the name of a copyright holder shall not be
    used in advertising or otherwise to promote the sale, use or other dealings in
    this Software without prior written authorization of the copyright holder.
*/

// Import Angular common modules
import { Input }        from '@angular/core';
import { Output }       from '@angular/core';
import { Component }    from '@angular/core';
import { EventEmitter } from '@angular/core';


@Component(
{
    selector: 'tool-frame',
    templateUrl: './tool-frame.component.html',
    styleUrls: ['./tool-frame.component.scss']
})

export class ToolFrameComponent
{
    /** This input allows for the definition for on the component is rendered */
    @Input() componentStyle: string;

    /** This input allows for the definition if the component is closable */
    @Input() isClosable: boolean = false;

    /** An emitter to register when the close event is clicked */
    @Output() closeEvent = new EventEmitter();

    constructor() { }

    /**
     * This method is a trigger for the user's selection to 'close'
     * the tool.  This then emits a signal for handling.
     */
    closeTool(): void
    {
        this.closeEvent.emit();
    }
}

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
import {  ViewChild } from '@angular/core';
import {  Component } from '@angular/core';

// Support Framework
import { ToolFrameComponent } from '../tool-frame/tool-frame.component';

@Component(
{
    selector: 'info-panel-component',
    templateUrl: './info-panel.component.html',
    styleUrls: ['./info-panel.component.scss']
})

export class InfoPanelComponent extends ToolFrameComponent
{
    /** This allows me to see and control my ToolFrame as needed */
    @ViewChild(ToolFrameComponent) private myToolFrame: ToolFrameComponent;

    constructor()
    {
        super();
    }
    
    /**
     * This method lets us connect to the frame and control it as needed
     * Currently this extends to: closeEvent
     */
    ngAfterViewInit()
    {
        // If the component is closable, subscribe to the frame closeEvent
        if (this.isClosable)
        {
            // Handle the close event...no data to save, this is info only
            this.myToolFrame.closeEvent.subscribe( () => this.closeTool() )
        }
    }
}

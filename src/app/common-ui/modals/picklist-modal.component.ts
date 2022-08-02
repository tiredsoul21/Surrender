/* Copyright - License

    bentKnee is true Open Source/Free Software and meet all definitions as such.
    It means that you are free to modify and redistribute all contents of the UI.
    You may also freely use bentKnee in your commercial projects.

    COPYRIGHT AND PERMISSION NOTICE

    Copyright (C) 2022, Derrick Cox,
    All rights reserved.

    Permission to use, copy, modify, and distribute this software for any purpose
    without fee is hereby granted, provided that the above copyright notice and this
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

// Common Angular imports
import { Inject }    from "@angular/core";
import { Component } from "@angular/core";

// Modal support
import { MatDialogRef }        from '@angular/material/dialog';
import { MAT_DIALOG_DATA }     from '@angular/material/dialog';

// Supporting Types
import { StringKeyValuePairs } from "src/app/types/general.types";

export interface PicklistModalDataType
{
    title?: string;
    list: Array<StringKeyValuePairs>;
    currentSelection?: string;
    closeButtonText?: string;
}

@Component(
{
    selector: 'dialog-overview-example-dialog',
    templateUrl: './picklist-modal.component.html',
    styleUrls: ['./picklist-modal.component.scss']
})

/**
 * This component is used as a simple display to present the user
 * with a picklist.  The picklist will close when the user presses
 * the close button, or makes a selection (different from current)
 * 
 * Some optional configurations are:
 * Title - Set the title to the desired text
 * Close Button Text - set the text displayed on the close button
 * Current Selection - the user's current selection from the list
 * List (Required) -  The list to populate the picklist with! 
 */
export class PicklistModalComponent
{
    /** A string containing the title text */
    private myTitle: string = "Make A Selection:";

    /** A string containing the Close button text */
    private myCloseButton: string = "Close"

    /** A string containing the currently selected string if provided */
    private myCurrentSelection: string;

    constructor(public dialogRef: MatDialogRef<PicklistModalComponent>,
                @Inject(MAT_DIALOG_DATA) public data: PicklistModalDataType)
    {
        // Set optional Close button text
        if (data.closeButtonText != undefined)
        {
            this.myCloseButton = data.closeButtonText;
        }
        
        // Set option Title text
        if (data.title != undefined)
        {
            this.myTitle = data.title;
        }
        
        // Set optional current selection
        if (data.currentSelection != undefined)
        {
            this.myCurrentSelection = data.currentSelection;
        }
    }

    /**
     * Get function reference for html form for the title
     */
    get title(): string
    {
        return this.myTitle;
    }

    /**
     * Get function reference for html form for the button close text
     */
    get closeButtonText(): string
    {
        return this.myCloseButton;
    }

    /**
     * Get function reference for html form for current selection
     */
    get currentSelection(): string
    {
        return this.myCurrentSelection;
    }

    /**
     * Set function reference for html form for current selection
     */
    set currentSelection(selection: string)
    {
        this.myCurrentSelection = selection;
    }

    /**
     * This is a cancel event.  Not change.
     * Closes without data
     */
    public onNoClick(): void
    {
        this.dialogRef.close();
    }

    /**
     * This method, takes the change event from the user, and passes
     * it to the requestor
     * @param {string} selection - the value returned from the form 
     */
    public onSelection(selection: string): void
    {
        this.dialogRef.close(selection);
    }
}
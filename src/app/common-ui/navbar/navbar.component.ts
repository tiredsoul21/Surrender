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
import { Component } from '@angular/core';

// Support services
import { NavbarService } from 'src/app/services/navbar.service';

// Custom Types
import { ItemSelectionType } from 'src/app/types/general.types';

@Component(
{
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

/**
 * This component is indended to be a heads-up display capturing critical
 * information pertaining to the application's current run state.  
 * This navbar contains: 
 * Branding:  Ability to display brand image and brand text.  Clicking on
 *      the brand image allows for the display of a menu.  The brand menu
 *      items, brand image, and brand text are populated via the navbar
 *      service.  callback support for menu options are executed directly, 
 *      and is expected to have callback defined elsewhere (IE a service?)
 */
export class NavbarComponent
{
    /** My private reference to the brand image path */
    private myBrandImage: string = "";

    /** my private storage for the brand text */
    private myBrandText:string = "No Name Brand";

    /** This is my personal list of menu items */
    private myBrandMenuItems: Array<ItemSelectionType> = [];

    constructor(readonly navbarService: NavbarService)
    {
        // Pull in the brand image from the service
        this.navbarService.brandImageSubject.subscribe((image:string) =>
        {
            this.myBrandImage = image;
        });

        // Pull in the brand text from the service
        this.navbarService.brandTextSubject.subscribe((text:string) =>
        {
            this.myBrandText = text;
        });

        // Pull in the menu items and their associated callbacks
        this.myBrandMenuItems = this.navbarService.getBrandMenu();
    }

    /**
     * Get function reference for html form for the brand image
     */
    get brandImage(): string
    {
        return this.myBrandImage;
    }

    /**
     * Get function reference for html form for the brand text
     */
    get brandText(): string
    {
        return this.myBrandText;
    }

    /**
     * Get function reference for html form for the brand menu items
     */
    get brandMenuItems(): Array<ItemSelectionType>
    {
        return this.myBrandMenuItems;
    }

    /**
     * This is a wrapper functions that communicates user's selection back
     * to the navbar service for handeling
     * @param callback - re-user provided call back to execute
     */
    public brandMenuCallback(callback: (() => void)): void
    {
        callback();
    }
}

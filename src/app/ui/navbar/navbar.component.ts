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
import { Component }        from '@angular/core';
import { ViewChild }        from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { ComponentFactory } from '@angular/core';
import { CdkDragDrop }      from '@angular/cdk/drag-drop';

// Support services
import { NavbarService } from 'src/app/ui/services/navbar.service';

// Custom Types
import { NavbarOptions }         from '../types/ui.types';
import { ItemSelection }         from '../../types/general.types';
import { ComponentMenuItem }     from '../../types/general.types';
import { ComponentMenuGroup }    from '../../types/general.types';
import { ComponentIconMenuItem } from '../../types/general.types';

// Base Factory Type import
import { ToolFrameComponent } from '../tools/tool-frame/tool-frame.component';

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
 * Headsup Display: Ability to drop down mini components for status and display
 *      of customize material
 */
export class NavbarComponent
{
    /** A reference tag for appending additional components */
    @ViewChild('dropLead', { read: ViewContainerRef }) dropLead: ViewContainerRef;

    /** My default component options */
    private navbarOptions: NavbarOptions =
    {
        brandImage: "/assets/images/innovation.jpg",
        brandText: "On Bent Knee"
    }

    /** This is my personal list of menu items */
    private myBrandMenuItems: Array<ItemSelection> = [];

    /** My personal list of menu item */
    private myMiniMenuItems: Array<ComponentMenuGroup | ComponentMenuItem> = [];

    constructor(readonly navbarService: NavbarService)
    {
        this.parseOptions(this.navbarService.getNavbarOptions())

        // Pull in the menu items and their associated callbacks
        this.myBrandMenuItems = this.navbarService.getBrandMenu();

        // Pull the menu items to display for the mini menu
        this.myMiniMenuItems = this.navbarService.getMiniMenu();
    }

    /**
     * Get function reference for html form for the brand image
     * @returns {string} - the path to the brand images
     */
    get brandImage(): string
    {
        return this.navbarOptions.brandImage;
    }

    /**
     * Get function reference for html form for the brand text
     * @returns {string} - the brand text to display
     */
    get brandText(): string
    {
        return this.navbarOptions.brandText;
    }

    /**
     * Get function reference for html form for the brand menu items
     * @returns {Array<ItemSelection>} - list of brand menu items
     */
    get brandMenuItems(): Array<ItemSelection>
    {
        return this.myBrandMenuItems;
    }

    /**
     * Get function reference for html form for the brand menu items
     * @returns {Array<ComponentMenuGroup | ComponentMenuItem>}
     *      This list of droppable menu components and menu branches
     */
    get miniMenuItems(): Array<ComponentMenuGroup | ComponentMenuItem>
    {
        return this.myMiniMenuItems;
    }

    /**
     * This is a wrapper functions that communicates user's selection back
     * to the navbar service for handeling
     * @param {() => void} callback - re-user provided call back to execute
     */
    public brandMenuCallback(callback: (() => void)): void
    {
        callback();
    }

    /**
     * This method if a button click creation event.  Eventually this may be a drag
     * and drop from the sidebar in future
     * @param {ComponentFactory<ToolFrameComponent>} componentFactory - the tool
     *      that is indended to fill a mini tool frame.  Must be an extension of
     *      ToolFrameComponent
     */
    public dropEvent(event: CdkDragDrop<ComponentIconMenuItem>): void
    {
        let componentFactory: ComponentFactory<ToolFrameComponent> = event.item.data.componentFactory;

        // add the component to the view
        const componentRef = this.dropLead.createComponent(componentFactory);

        // Configure component to display mini mode
        componentRef.instance.componentStyle = 'mini';
        componentRef.instance.isClosable = true;

        // Register close event
        componentRef.instance.closeEvent.subscribe( () =>
        {
            componentRef.destroy();
        });
    }

    /**
     * This method overrides default option settins for this component
     * if configured
     * @param {NavbarOptions} options - options to parse
     */
    private parseOptions(options: NavbarOptions): void
    {
        if (options == undefined || options == null)
        {
            return;
        }
        if (options.brandImage != undefined)
        {
            this.navbarOptions.brandImage = options.brandImage;
        }
        if (options.brandText != undefined)
        {
            this.navbarOptions.brandText = options.brandText;
        }
    }

    /**
     * Returns if the Group has sub items
     * @param {ComponentMenuGroup} group - Menu group to check
     * @returns {boolean} true if has content
     */
    public hasSubItems(group: ComponentMenuGroup): boolean
    {
        return !(group.subGroupItems == undefined || group.subGroupItems.length == 0);
    }
}


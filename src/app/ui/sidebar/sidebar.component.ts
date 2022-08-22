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
import { Component }               from "@angular/core";
import { QueryList }               from "@angular/core";
import { ViewChildren }            from "@angular/core";
import { ChangeDetectorRef }       from "@angular/core";
import { ChangeDetectionStrategy } from '@angular/core';
import { MatMenuTrigger }          from "@angular/material/menu";

// Custom Types
import { SidebarOptions }         from "../types/ui.types";
import { ComponentIconMenuItem }  from "../../types/general.types";
import { ComponentIconMenuGroup } from "../../types/general.types";

// Support services
import { SidebarService } from '../services/sidebar.service'

@Component(
{
    selector: "sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})

/**
 * This component is intended to provide the ability to make tool selections
 * for analysis.  Able to minimize the sidebar to reduce used space.
 * This sidebar contains:
 * Expandable Menu: The ability to display a menu for an array of buttons
 *      and components.  These componets can be used to drop tools into the
 *      main play area
 */
export class SidebarComponent
{
    /** Necessary to close menu on mouseleave event to drop overlay */
    @ViewChildren(MatMenuTrigger) menuTrigger: QueryList<MatMenuTrigger>;

    /** Mouse over trigger if entered a lvl 2 menu -- used for menu close */
    public menuMouseover2: boolean = false;

    /** Mouse over trigger if entered a lvl 3 menu -- used for menu close */
    public menuMouseover3: boolean = false;

    /** My personal list of menu item */
    private mySidebarMenuItems: Array<ComponentIconMenuGroup | ComponentIconMenuItem> = [];

    /** Indication if sidebar is ready for full render */
    private sidebarReady: boolean = false;

    /** My reference to if sidebar is minimized */
    private minimized: boolean = true;

    /** My default component options */
    private sidebarOptions: SidebarOptions =
    {
        sidebarHeader: 'Analysis',
        sidebarTransition: 500,
        dragDropRecerivers: []
    }

    constructor(readonly sidebarService: SidebarService,
                readonly changeDetection: ChangeDetectorRef)
    {
        // Get the list of sidebar items to display
        this.mySidebarMenuItems = this.sidebarService.getSidebarMenu();
        console.log(this.mySidebarMenuItems)

        this.parseOptions(this.sidebarService.getSidebarOptions());
    }

    /**
     * Getter for my transmission speed - returns a concat of time with 'ms'
     * @returns {string} - time string in milliseconds
     */
    get transitionSpeed(): string
    {
        return this.sidebarOptions.sidebarTransition + 'ms';
    }

    /**
     * Returns if the sidebar is ready to render full sidebar
     * @returns {boolean} - true if ready
     */
    get isSidebarReady(): boolean
    {
        return this.sidebarReady;
    }

    /**
     * Returns if the sidebar is minimized or not
     * @returns {boolean} - true if minimized
     */
    get isMinimized(): boolean
    {
        return this.minimized;
    }

    /**
     * This method returns the display header string
     * @returns {string} - Sidebar header text
     */
    get displayHeader(): string
    {
        return this.sidebarOptions.sidebarHeader;
    }

    /**
     * This method returns the sidebar menu for display rendering
     * @returns {Array<ComponentIconMenuGroup | ComponentIconMenuItem>}
     *      List of menu items
     */
    get sidebarMenuItems(): Array<ComponentIconMenuGroup | ComponentIconMenuItem>
    {
        return this.mySidebarMenuItems;
    }

    /**
     * This method returns the element ids for dropable containers
     * @returns {Array<string>} - ID array
     */
    get cdkReceivers(): Array<string>
    {
        return this.sidebarOptions.dragDropRecerivers;
    }

    /**
     * This method overrides default option settins for this component
     * if configured
     * @param {SidebarOptions} options - options to parse
     */
    private parseOptions(options: SidebarOptions): void
    {
        if (options == undefined || options == null)
        {
            return;
        }
        if (options.sidebarHeader != undefined)
        {
            this.sidebarOptions.sidebarHeader = options.sidebarHeader;
        }
        if (options.sidebarTransition != undefined)
        {
            this.sidebarOptions.sidebarTransition = options.sidebarTransition;
        }
        if (options.dragDropRecerivers != undefined && options.dragDropRecerivers.length > 0)
        {
            this.sidebarOptions.dragDropRecerivers = options.dragDropRecerivers;
        }
    }

    /**
     * This method is responsible for minimizing the sidebar, but also
     * the delay speed for maximized sidebar rendering
     */
    public minimizeEvent(): void
    {
        this.minimized = !this.minimized;

        // Delay the spawn of the full display til after animation
        if (!this.minimized)
        {
            setTimeout(() =>
            {
                this.sidebarReady = true;
                this.changeDetection.markForCheck();
            }, this.sidebarOptions.sidebarTransition*.8);
        }
        else
        {
          this.sidebarReady = false;
        }
    }

    /**
     * Returns if the Group has sub items
     * @param {ComponentIconMenuGroup} group - Menu group to check
     * @returns {boolean} true if has content
     */
    public hasSubItems(group: ComponentIconMenuGroup): boolean
    {
        return !(group.subGroupItems == undefined || group.subGroupItems.length == 0);
    }

    /**
     * This mehtod handles logic for sucessful menu close
     */
    closeMenu(): void
    {
        // Execute a delay to allow menu transitions
        setTimeout(() =>
        {
            // If mouse is over a menu exit
            if (this.menuMouseover2 || this.menuMouseover3)
            {
                return;
            }
            // Else close all menus
            for(let component of this.menuTrigger)
            {
                component.closeMenu()
            }
        }, 50)
    }
}


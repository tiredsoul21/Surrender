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

// Angular support
import { ComponentFactory }   from "@angular/core";

// Base Factory Type import
import { ToolFrameComponent } from "../ui/tools/tool-frame/tool-frame.component";

/**
 * This interface is intended to provide options that are tied back
 * to functionality.  That is, an item that if referenced by some manner
 * provides a callback for action handling.  This can be used in menus
 * as an example
 */
export interface ItemSelectionType
{
    /** This is some unique ID for the menu item (if needed) */
    key?: string;

    /** This is a proper display name for the item */
    displayName: string;
    
    /** This is a description for the Menu Item.  Likely use might be tool tips */
    description?: string;

    /** 
     * Is there an mat-icon associated with the menu item? If so add it here.
     * See https://jossef.github.io/material-design-icons-iconfont/ for list of icons
     */
    icon?: string;

    /** 
     * This is a callback function that provides a handle to pass functionality from
     * a menu or selection item, back to a service
     */
    selectionCallback: (data?: any)=> void;
}

/**
 * This interface is to provide a method to pass the ability to generate
 * components ad-hoc in the UI.  These factories would be generated in the
 * service level, and provided as inputs into the framework.
 */
export interface ComponentSelectionType
{
    /** This is some unique ID for the menu item (if needed) */
    key?: string;

    /** This is a proper display name for the item */
    displayName: string;
    
    /** This is a description for the Component.  Likely use might be tool tips */
    description?: string;

    /** 
     * Is there an mat-icon associated with the component? If so add it here.
     * See https://jossef.github.io/material-design-icons-iconfont/ for list of icons
     */
    icon?: string;

    /** This is a factory for rendering components */
    componentFactory: ComponentFactory<ToolFrameComponent>;
}

/**
 * This is one iteraction of a menu type.  This menu type allows
 * for the selection of a component via a menu item.  Component
 * Factories are presented as endpoints
 */
export interface ComponentMenuType
{
    /** This is a proper display name for the group */
    displayName: string;

    /** 
     * This is an array that either recursively allows sub menus or 
     * end item component selection
     */
    subGroupItems: Array<ComponentMenuType | ComponentSelectionType>;

    /** This is a description for the Group.  Likely use might be tool tips */
    description?: string;

    /** 
     * Is there an mat-icon associated with the group? If so add it here.
     * See https://jossef.github.io/material-design-icons-iconfont/ for list of icons
     */
    icon?: string;
}

/**
 * This interface is used for multiple interfaces that require simple
 * one-to-one string mappings.
 */
export interface StringKeyValuePairs
{
    /** This is intended to be a unique identifier for the object */
    key: string;

    /** This is indended to be a useable value, such as a 'Display Value' */
    value: string;
}
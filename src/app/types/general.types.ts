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

export interface ItemSelectionType
{
    // This is some unique ID for the menu item (is needed)
    key?: string;

    // This is a proper display name for the item
    displayName: string;

    // Is there an mat-icon associated with the menu item? If so add it here.
    // See https://jossef.github.io/material-design-icons-iconfont/ for list of icons
    icon?: string;

    // This is a callback function that provides a handle to pass functionality from
    // a menu or selection item, back to a service
    selectionCallback: ()=> void;
}

/**
 * This interface is used for multiple interfaces that require simple
 * one-to-one string mappings.
 */
export interface StringKeyValuePairs
{
    // This is intended to be a unique identifier for the object
    key: string;

    // This is indended to be a useable value, such as a 'Display Value'
    value: string;
}
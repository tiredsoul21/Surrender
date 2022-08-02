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

import { Injectable } from '@angular/core';
import { StringKeyValuePairs } from '../types/general.types';

@Injectable()

/** 
 * This service applies a targeted theme to a an html
 * element with a specific reference.  * * If using other
 * components in the repository, then to apply settings
 * globally, then target 'dashboard', which is the default.
 * * If you only wish to apply the theme to a limited scope,
 * then apply the theme to the minimum containing scope.
 * * If you are applying multiple themes, you'd want to apply
 * them to the largest scope first, then work your way deeper
 * into the html.
 * * This implementation is targeted for only having light / dark
 * theme, but can have as many as desired, so long as they are
 * defined in the styles.  Each theme should contains a similar
 * variable definition scheme to transition to.
 * @see /Surrender/src/styles.scss
 */
export class ThemeService
{
    /** My copy of the re-user defined default theme */
    private defaultTheme: string = "dark-theme";

    /** This maintains the dynamic changing theme for reference */
    private currentTheme: string;

    /**
     * This string is the element that theme is to be updated
     * If this is a global theme
     */
    private elementReferenceId: string = "body";

    /** The 1-to-1 relationship between theme name and class name */
    private themeList: Array<StringKeyValuePairs> = [
        //Define here the list of themes
        {value: "Light Theme", key: "light-theme"},
        {value: "Dark Theme", key: "dark-theme"}
    ];

    constructor()
    {
        // Set the current theme to the default
        this.currentTheme = this.defaultTheme;
    }

    /**
     * This method returns the default chosen theme.
     * @returns {string} - the default theme for initialization
     */
    public getDefaultTheme(): string
    {
        return this.defaultTheme;
    }

    /**
     * This method allows us to refernce css theme tags with a given
     * display name for user selection
     * @returns {Array<StringKeyValuePairs>} - returns the css theme array
     */
    public getThemeList(): Array<StringKeyValuePairs>
    {
        return this.themeList;
    }

    /**
     * This method sets the current referenceId to a targeted them
     * @param {string} theme - desired theme
     */
    public setTheme(theme: string): void
    {
        // Fetch the dashboard Element (this is everything)
        var element = document.getElementById(this.elementReferenceId);

        // Strip current theme
        element.classList.remove(this.currentTheme)

        // Update the current theme to the desired one
        this.currentTheme  = theme;
        element.classList.add(theme);
    }

    /**
     * This method returns the currently selected them
     * @returns {string} theme class name
     */
    public getCurrentTheme(): string
    {
        return this.currentTheme;
    }

    /**
     * This method allows to to set the target html elemenet reference
     * @param referenceId - targeted html reference string
     */
    public setElementReferenceId(referenceId: string): void
    {
        this.elementReferenceId = referenceId;
    }
}

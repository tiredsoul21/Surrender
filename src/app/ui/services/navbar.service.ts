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
import { Injectable }               from '@angular/core';
import { ComponentFactoryResolver } from '@angular/core';
import { BehaviorSubject }          from 'rxjs';

// Support services
import { ThemeService } from '../../services/theme.service';

// Custom types for displays
import { ItemSelectionType }      from '../../types/general.types';
import { ComponentMenuType }      from '../../types/general.types';
import { ComponentSelectionType } from '../../types/general.types';
import { PicklistModalDataType }  from '../modals/picklist-modal.component';

// Modal support
import { MatDialog }              from '@angular/material/dialog';
import { MatDialogConfig }        from '@angular/material/dialog';
import { PicklistModalComponent } from '../modals/picklist-modal.component';

// Projectable Tools
import { InfoPanelComponent }     from '../tools/info-panel/info-panel.component';
import { SummaryPanelComponent }  from '../tools/status-panel/summary-panel.component';

@Injectable()

/** 
 * This navbar service allows for a re-user to customize the brand image,
 * the brand text, and the corresponding dropdown menu that generates from
 * clicking the brand image.  
 * 
 * The menu items allow for the re-user
 * to specify specific functionality assigned to a menu item.  These callback
 * functions must be passed into the menu items.  The menu items don't require
 * an icon to be define
 * 
 * Methods and BehaviorSubjects that are required by the navbar component are
 * specifically labeled with 'REQUIRED BY'
 */
export class NavbarService
{
    /** My path relative to /src for navbar brand image */
    private brandImage: string = "/assets/images/innovation.jpg";

    /** My record of navbar brand text */
    private brandText: string = "On Bent Knee";

    /**
     * The brand image subscription
     * REQUIRED BY navbar.component
     */
    public brandImageSubject: BehaviorSubject<string> = new BehaviorSubject(this.brandImage);

    /**
     * The brand text subscription
     * REQUIRED BY navbar.component
     */
    public brandTextSubject: BehaviorSubject<string> = new BehaviorSubject(this.brandText);

    /**
     * This array allows the re-user to define the navbar menu items and callbacks
     * see: https://jossef.github.io/material-design-icons-iconfont/ for list of icons
     */
    private brandMenuItems: Array<ItemSelectionType> =
    [
        {
            displayName: 'Select Theme',
            icon: 'format_paint',
            selectionCallback: () => this.setTheme()
        },
        {
            displayName: 'Signout',
            icon: 'logout',
            selectionCallback: () => this.signout()
        }
    ]

    /**
     * This array allows for the re-user to define the components that are displayed
     * in the addMiniTool menu
     */
    private miniMenuItems: Array<ComponentMenuType | ComponentSelectionType> =
    [
        {
            displayName: "Info",
            subGroupItems: 
            [
                {
                    displayName: "Info Panel",
                    componentFactory: this.cfr.resolveComponentFactory(InfoPanelComponent),
                },
                {
                    displayName: "Summary Panel",
                    componentFactory: this.cfr.resolveComponentFactory(SummaryPanelComponent)
                }
            ]
        },
        {
            displayName: "Technicals",
            subGroupItems: 
            [
                {
                    displayName: "stubFun1",
                    componentFactory: this.cfr.resolveComponentFactory(InfoPanelComponent)
                },
                {
                    displayName: "stubFun2",
                    componentFactory: this.cfr.resolveComponentFactory(InfoPanelComponent)
                },
                {
                    displayName: "stubGroup",
                    subGroupItems: 
                    [
                        {
                            displayName: "stubFun3",
                            componentFactory: this.cfr.resolveComponentFactory(InfoPanelComponent)
                        },
                        {
                            displayName: "stubFun4",
                            componentFactory: this.cfr.resolveComponentFactory(InfoPanelComponent)
                        }
                    ]
                }
            ]
        },
        {
            displayName: "stubFun5",
            componentFactory: this.cfr.resolveComponentFactory(InfoPanelComponent)
        }
    ]

    constructor(private dialog: MatDialog,
                readonly themeService: ThemeService,
                private cfr: ComponentFactoryResolver)
    { }

    /**
     * This method sets the navbar service image reference
     * and then updates the subject
     * @param {string} imagePath - desired brand image path
     */
    public setBrandImage(imagePath: string): void
    {
        this.brandImage = imagePath;
        this.brandImageSubject.next(this.brandImage);
    }

    /**
     * This method sets the navbar service text and then
     * updates the subject
     * @param {string} text - desired brand text
     */
    public setBrandText(text: string): void
    {
        this.brandText = text;
        this.brandTextSubject.next(this.brandText);
    }

    /**
     * This method supplies the menu items to the navbar component
     * Callbacks provided should be wholely contained in this service,
     * without variable dependancy.  That is, the menu items, communicate
     * only what the user wishes to do, and then you do it here.
     * 
     * REQUIRED BY navbar.component
     * 
     * @returns {Array<ItemSelectionType>} - Navbar menu items list
     */
    public getBrandMenu(): Array<ItemSelectionType>
    {
        return this.brandMenuItems;
    }
    /**
     * This method supplies the menu items to the add mini-tool
     * menu.  Proper definition should resolve to a menu items that
     * is linked to a componentType extended from ToolFrame
     * 
     * REQUIRED BY navbar.component
     * 
     * @returns {Array<ItemSelectionType>} - Navbar menu items list
     */
    public getMiniMenu(): Array<ComponentMenuType | ComponentSelectionType>
    {
        return this.miniMenuItems;
    }

    /**
     * This method handles the setting of the theme for the whole application.
     * This launces a modal, gathers user, selections, and sets the theme.
     * This is an example of a menu item callback function
     */
    private setTheme(): void
    {
        // Configure our dialog box to add our themes
        const dialogConfig = new MatDialogConfig();
        let picklistData: PicklistModalDataType = 
        {
            title: "Select Theme:",
            closeButtonText: "Cancel",
            list: this.themeService.getThemeList(),
            currentSelection: this.themeService.getCurrentTheme()
        }
        dialogConfig.data = picklistData;

        // Open dialog
        const dialogRef = this.dialog.open(PicklistModalComponent, dialogConfig);
      
        // Process response from user
        dialogRef.afterClosed().subscribe(result =>
        {
            if (result != undefined)
            {
                this.themeService.setTheme(result);
            }
        });
    }

    /**
     * This is a stubbed out method to signout of the application.
     * (An example for adding additional menu items)
     */
    private signout(): void
    {
        console.log("Stubbed out signout function");
    }
}

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

// Custom types for displays
import { SidebarOptions }         from '../types/ui.types';
import { ComponentIconMenuItem }  from '../../types/general.types';
import { ComponentIconMenuGroup } from '../../types/general.types';

// Projectable Tools
import { InfoPanelComponent }     from '../tools/info-panel/info-panel.component';
import { SummaryPanelComponent }  from '../tools/status-panel/summary-panel.component';

@Injectable()

/**
 * This sidebar service allows for a re-user to customize the display elements
 * on the sidebar for compoents
 *
 * This service also allows for the definitions of sidebar characteritcs such
 * as the transition time and title.
 *
 * Methods and BehaviorSubjects that are required by the sidebar component are
 * specifically labeled with 'REQUIRED BY'
 */
export class SidebarService
{
    /**
     * This array allows for the re-user to define the components that are displayed
     * in the addMiniTool menu
     */
    private sidebarMenuItems: Array<ComponentIconMenuGroup | ComponentIconMenuItem> =
    [
        {
            icon: 'search',
            displayName: "Information",
            subGroupItems:
            [
                {
                    icon: 'info',
                    displayName: "Information Panel",
                    componentFactory: this.cfr.resolveComponentFactory(InfoPanelComponent),
                },
                {
                    icon: 'fact_check',
                    displayName: "Summary Panel",
                    componentFactory: this.cfr.resolveComponentFactory(SummaryPanelComponent)
                }
            ]
        },
        {
            icon: 'tune',
            displayName: "Fundamentals",
            componentFactory: this.cfr.resolveComponentFactory(InfoPanelComponent)
        },
        {
            icon: 'wifi_channel',
            displayName: "Technicals",
            subGroupItems:
            [
                {
                    icon: 'add',
                    displayName: "stubFun1",
                    componentFactory: this.cfr.resolveComponentFactory(InfoPanelComponent)
                },
                {
                    icon: 'add',
                    displayName: "stubFun2",
                    componentFactory: this.cfr.resolveComponentFactory(InfoPanelComponent)
                },
                {
                    icon: 'add',
                    displayName: "stubGroup",
                    subGroupItems:
                    [
                        {
                            icon: 'add',
                            displayName: "stubFun3",
                            componentFactory: this.cfr.resolveComponentFactory(InfoPanelComponent)
                        },
                        {
                            icon: 'add',
                            displayName: "stubFun4",
                            componentFactory: this.cfr.resolveComponentFactory(InfoPanelComponent)
                        }
                    ]
                }
            ]
        }
    ]

    /** Options associated with display and response of sidebar */
    private sidebarOptions: SidebarOptions =
    {
        sidebarHeader: 'Analysis',
        sidebarTransition: 500
    }

    constructor(private cfr: ComponentFactoryResolver) { }

    /**
     * This method supplies the menu items to the sidebar
     * menu.  Proper definition should resolve to a menu items that
     * is linked to a componentType extended from ToolFrame
     *
     * REQUIRED BY sidebar.component
     *
     * @returns {Array<ComponentMenuGroup | ComponentMenuItem>}
     *      Sidebar menu items list
     */
    public getSidebarMenu(): Array<ComponentIconMenuGroup | ComponentIconMenuItem>
    {
        return this.sidebarMenuItems;
    }

    /**
     * Transmit the sidebar options to the component.  Items from the options
     * left blank are assumed default, and sending null assumes all default
     * options.
     *
     * REQUIRED BY sidebar.component
     *
     * @returns {SidebarOptions} - specified options for sidebar
     */
    public getSidebarOptions(): SidebarOptions
    {
        return this.sidebarOptions;
    }
}

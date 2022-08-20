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
import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

// Import router
import { DashboardRoutingModule } from './dashboard-routing.module';

// Import shared resources
import { NavbarModule }  from '../../ui/navbar/navbar.module';
import { SidebarModule } from '../../ui/sidebar/sidebar.module';

// Import page sub components
import { DashboardComponent } from './dashboard.component';

// Custom Services
import { ThemeService } from '../../services/theme.service';

@NgModule(
{
    imports:
    [
        CommonModule,
        DashboardRoutingModule,

        NavbarModule,
        SidebarModule
    ],
    providers: [ThemeService],
    declarations:
    [
        DashboardComponent,
    ]
})

export class DashboardModule
{
    constructor() { }
}

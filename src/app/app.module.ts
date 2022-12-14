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

// Browser and Ng support
import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';

// Routing support
import { RouterModule }     from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

// Import Global Services

// Import global resources
import { MatDialogModule }         from '@angular/material/dialog';
import { HttpClientModule }        from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Sub modules for pages
import { LoginModule }     from './pages/login/login.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';

// Application level component
import { AppComponent } from './app.component';

@NgModule(
{
    declarations:
    [
        AppComponent,
    ],
    imports:
    [
        BrowserModule,
        RouterModule.forRoot([]),
        AppRoutingModule,

        MatDialogModule,
        HttpClientModule,
        BrowserAnimationsModule ,

        DashboardModule,
        LoginModule,
    ],
    providers: [],
    bootstrap:
    [
        AppComponent
    ]
})

export class AppModule { }

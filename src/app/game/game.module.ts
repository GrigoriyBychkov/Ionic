import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GamePageRoutingModule } from './game-routing.module';

import { GamePage } from './game.page';
import {SortablejsModule} from 'ngx-sortablejs';
import {SettingsPage} from './settings/settings.page';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SortablejsModule.forRoot({ animation: 150, preventOnFilter: true }),
    GamePageRoutingModule,
    SharedModule,
  ],
  declarations: [GamePage, SettingsPage]
})
export class GamePageModule {}

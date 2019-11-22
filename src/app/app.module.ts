import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/reducers/app.reducer';
import { environment } from '../environments/environment';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { GameComponent } from './components/game/game.component';
import { BoardComponent } from './components/board/board.component';
import { CellComponent } from './components/cell/cell.component';
import { EffectsModule } from '@ngrx/effects';
import { GameEffects } from './store/effects/game.effect';

@NgModule({
  declarations: [AppComponent, GameComponent, BoardComponent, CellComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([GameEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

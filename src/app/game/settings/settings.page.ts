import { Component, OnInit } from '@angular/core';
import {GamePage} from '../game.page';
import {IState, StateService} from '../../services/state.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  state: IState;

  constructor(private stateService: StateService){
    this.state = this.stateService.getState();
  }


  ngOnInit() {
  }

  setLevelEasy(){
    this.state.userDifficulty = 3;
    this.stateService.resetState();
    // GamePage.initFromLocalStorage();
  }
  setLevelMedium(){
    this.state.userDifficulty = 2;
    this.stateService.resetState();
    // GamePage.initFromLocalStorage();
  }
  setLevelHard(){
    this.state.userDifficulty = 1;
    this.stateService.resetState();
    // GamePage.initFromLocalStorage();
  }
  setInstrumentPiano(){
    this.state.instrument = 'GrandPiano';
    this.stateService.initSounds();
    this.stateService.loadLevel();
  }
  setInstrumentGuitar(){
    this.state.instrument = 'AcousticGuitar';
    this.stateService.initSounds();
    this.stateService.loadLevel();
  }
  setOctave2(){
    this.state.octave = 2;
    this.stateService.initSounds();
    this.stateService.loadLevel();
  }
  setOctave3(){
    this.state.octave = 3;
    this.stateService.initSounds();
    this.stateService.loadLevel();
  }
  resetLocalStorage(){
   this.stateService.resetState();
  }

}

import { Injectable } from '@angular/core';
import {shuffle} from 'lodash';
// const sounds = ['A4', 'Ab4', 'Bb4', 'C4', 'D4', 'Db4', 'E4', 'Eb4', 'F4', 'G4', 'Gb4'];
const sounds = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

export interface IState {
  start: boolean;
  userLevel: number;
  userDifficulty: number;
  userNotes: string[];
  playOrder: string[];
  userOrder: string[];
  score: number;
  levelScore: number;
  plays: string[];
  maxScore: number;
  playCount: number;
  instrument: string;
  octave: number;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  stateDefault = {
    start: true,
    userLevel: 1,
    userDifficulty: 3,
    userNotes: [],
    playOrder: [],
    userOrder: [],
    score: 0,
    levelScore: 1100,
    plays: [],
    maxScore: 0,
    playCount: 5,
    instrument: 'GrandPiano',
    octave: 2,
  };
  sounds1 = {};
  state = {...this.stateDefault};

  constructor() {
    console.log('init');
    this.initFromLocalStorage();

  }

  getState() {
    return this.state;
  }

  initSounds() {
    sounds.forEach((item) => {
      this.sounds1[item] = new Audio('assets/' + this.state.instrument + '/' + this.state.octave + '/' + item  + '.wav');
    });
    console.log('this.sounds', this.sounds1);
  }

  initFromLocalStorage(){
    if (localStorage.state && localStorage.state.length > 0) {
      this.state = {
        ...this.state,
        ...JSON.parse(localStorage.state)
      };
    }
  }

  saveToLocalStorage() {
    localStorage.state = JSON.stringify(this.state);
  }

  resetState() {
    const octave = this.state.octave;
    const instrument = this.state.instrument;
    const difficulty = this.state.userDifficulty;
    Object.assign(this.state, {...this.stateDefault});
    this.state.octave = octave;
    this.state.userDifficulty = difficulty;
    this.state.instrument = instrument;
    this.saveToLocalStorage();
    this.loadLevel();
  }

  initNotes() {
    const soundCount = Math.ceil(this.state.userLevel / this.state.userDifficulty) + 1;
    this.state.userNotes = shuffle(sounds.slice(0)).slice(0, soundCount);
  }

  initPlays() {
    const arrLength = this.state.userLevel + 1;
    console.log('userNotes2', this.state.userNotes);
    this.state.plays = this.state.userNotes.slice(0);
    while (this.state.plays.length < arrLength) {
      this.state.plays.push(...this.state.userNotes.slice(0));
    }
    this.state.plays = shuffle(this.state.plays.slice(0, arrLength));
    console.log('this.plays', this.state.plays);
  }

  loadLevel() {
    this.initNotes();
    this.initPlays();
    this.state.playOrder = this.state.plays;
    this.state.userOrder = shuffle(this.state.playOrder);
    this.saveToLocalStorage();
    this.state.start = false;
    console.log('this.start', this.state.start);
  }



  // todo перенести init звуков
}

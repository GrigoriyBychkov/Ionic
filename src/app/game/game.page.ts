import {Component, OnInit} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {IState, StateService} from '../services/state.service';
// const sounds = ['A4', 'Ab4', 'Bb4', 'C4', 'D4', 'Db4', 'E4', 'Eb4', 'F4', 'G4', 'Gb4', 'Eb4'];
const sounds = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
const sounds1 = {};

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  state: IState;
  sounds = sounds;

  constructor(public alertController: AlertController,
              private stateService: StateService) {
      this.state = this.stateService.getState();
      this.stateService.initSounds();
      console.log(this.state);
  }

  sortablejsOptions = {
    onUpdate: (event: any) => {
      console.log(event);
      console.log(this.state.userOrder);
      // event.target.sort
      event.pullMode = 'true';
      this.stateService.saveToLocalStorage();
      this.checkUserOrder();
    },
    onSort: (event: any) => {
      console.log(event.target.innerText);
      const innerText = this.state.userOrder;
      // sortablejs.sort()
      console.log(innerText.join('\n'));
      // event.target.innerText = innerText.join('\n');
      console.log(this.state.userOrder);
    },
    onFilter: (event: any) => {
      console.log('FILTER');
    }
  };

  loadLevel() {
    this.stateService.loadLevel();
    this.state.start = false;
    console.log('this.start', this.state.start);
    this.playAudio();
  }

  ngOnInit() {
    this.loadLevel();
    console.log(this);
  }

  async checkUserOrder() {
    if (this.state.playOrder.join() === this.state.userOrder.join()) {
      const alert = await this.alertController.create({
        header: 'Congratulations!',
        // subHeader: 'Subtitle',
        message: 'Your score: ' + this.state.levelScore,
        buttons: ['OK']
      });

      await alert.present();
      this.state.userLevel += 1;
      this.state.score += this.state.levelScore;
      if (!localStorage.maxScore) {
        localStorage.maxScore = 0;
      }
      if (this.state.score > localStorage.maxScore) {
        (localStorage.maxScore = this.state.score);
        this.state.maxScore = this.state.score;
      }
      this.state.levelScore = 700 + (300 / this.state.userDifficulty);
      this.state.playCount += this.state.userDifficulty;
      this.loadLevel();
      // this.stateService.saveToLocalStorage();
    } else {
      // const alert = await this.alertController.create({
      //   header: 'Wrong',
      //   // subHeader: 'Subtitle',
      //   message: 'Please try again',
      //   buttons: ['OK']
      // });
      // this.score -= 500;
      // await alert.present();
    }
    this.stateService.saveToLocalStorage();
  }

  playSound(sound: string) {
    this.stateService.sounds1[sound].currentTime = 0;
    this.stateService.sounds1[sound].play();
  }

  async playAudio() {
    if (this.state.playCount > 0){
      const playSounds = this.state.playOrder.slice();
      this.state.levelScore -= 100;
      this.state.playCount -= 1;
      const interval = setInterval(() => {
        if (playSounds.length === 0) {
          clearInterval(interval);
          return;
        }
        const sound = playSounds.shift();
        this.playSound(sound);
      }, 1000);
    } else {
      const alert = await this.alertController.create({
        header: 'Sorry!',
        // subHeader: 'Subtitle',
        message: 'You dont have enough plays. Please start again!',
        buttons: [
          {
            text: 'Ok',
            role: 'cancel',
            handler: () => {
              console.log('Ok pressed');
            }
          },
          {
            text: 'Play again',
            handler: () => {
              this.stateService.resetState();
            }
          }
        ]
      });
      await alert.present();
    }
  }
}

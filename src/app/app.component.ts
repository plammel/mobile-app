import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite';

import { HomePage } from '../pages/home/home';
import { TurnosPage } from '../pages/turnos/turnos';
import { EscanerDniPage } from '../pages/escaner-dni/escaner-dni';
import { RegistroPage } from '../pages/registro/registro';
import { LoginPage } from '../pages/login/login';

import { DatabaseProvider } from '../providers/database/database';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  constructor(public database: DatabaseProvider, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public sqlite: SQLite) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Login', component: LoginPage },
      { title: 'Registro', component: RegistroPage },
      { title: 'Escaneo DNI', component: EscanerDniPage },
      { title: 'Turnos', component: TurnosPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.createDatabase();
    });
  }

  private createDatabase() {
    this.sqlite.create({
      name: 'db.db',
      location: 'default' // the location field is required
    })
      .then((db) => {
        this.database.setDatabase(db);
        return this.database.createTable();
      })
      .then(() => {
        this.splashScreen.hide();
        this.rootPage = 'HomePage';
      })
      .catch(error => {
        console.error(error);
      });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

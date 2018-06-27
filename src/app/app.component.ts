import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  criterias = [
    { title: 'Техника' },
    { title: 'Хореография' },
    { title: 'Изпълнение' },
    { title: 'Шоу/Имидж' }
  ];

  competitors = [];
  sortedCompetitors = [];

  result = false;

  shown1 = false;
  shown2 = false;
  shown3 = false;

  errors = null;
  criteriaError = null;

  sameResults = null;
  sameResults2 = null;
  sameResults3 = null;

  showAllResults = false;

  firstPlaceCompetitor = null;
  secondPlaceCompetitor = null;
  thirdPlaceCompetitor = null;

  addCriteria(inputCriteria) {
    if (inputCriteria.value === '') {
      this.criteriaError = 'Моля въведете критерий.';
      (() => {
        setTimeout(() => {
          this.criteriaError = null;
        }, 2000);
      })();
      return;
    }
    if (this.competitors.length > 0) {
      this.criteriaError = `Не може да добавяте критерии след като сте въвели състезатели.
      За да въведете нов критерий е нужно да рестартирате програмата.
      Текущите резултати ще бъдат изтрити.`;
      (() => {
        setTimeout(() => {
          this.criteriaError = null;
        }, 10000);
      })();
      return;
    }
    const newCriteria = { title: inputCriteria.value };
    this.criterias.push(newCriteria);
    inputCriteria.value = '';
  }

  sum(form: NgForm) {
    if (this.errorCheck(form, null)) {
      return;
    }
    let sum = 0;
    const criteriasPoints = [];
    for (const criteria of this.criterias) {
      const title = criteria.title;
      if (this.errorCheck(null, form.value[title])) {
        return;
      }
      sum = sum + Number(form.value[title]);
      const currentCriteriaData = {
        title: criteria.title,
        points: Number(form.value[title])
      };
      criteriasPoints.push(currentCriteriaData);
    }
    const competitor = {
      name: form.value.name.toUpperCase(),
      points: sum,
      style: form.value.selectDanceStyle,
      criterias: criteriasPoints
    };
    this.competitors.push(competitor);
    this.result = true;
    this.sortedCompetitors = _.sortBy(this.competitors, ['points']);
    this.sortedCompetitors = this.sortedCompetitors.reverse();
    this.checkWinners(this.sortedCompetitors);
    this.firstPlaceCompetitor = this.sortedCompetitors[0];
    this.secondPlaceCompetitor = this.sortedCompetitors[1];
    this.thirdPlaceCompetitor = this.sortedCompetitors[2];

    form.reset();
  }

  checkWinners(sortedCompetitors) {
    const competitorsPoints = [];
    for (const competitor of sortedCompetitors) {
      if (competitor) {
        competitorsPoints.push(competitor.points);
      }
    }
    if (_.indexOf(competitorsPoints, sortedCompetitors[0].points, 1) !== -1) {
      this.sameResults = `Резултатите са неточни. Има състезател/състезатели с точки равни на точките на състезателят на Първо място.`;
    } else {
      this.sameResults = null;
    }
    if (sortedCompetitors[1]) {
      if (_.indexOf(competitorsPoints, sortedCompetitors[1].points, 2) !== -1) {
        this.sameResults2 = 'Резултатите са неточни. Има състезател/състезатели с точки равни на точките на състезателят на Второ място.';
      } else {
        this.sameResults2 = null;
      }
    }
    if (sortedCompetitors[2]) {
      if (_.indexOf(competitorsPoints, sortedCompetitors[2].points, 3) !== -1) {
        this.sameResults3 = 'Резултатите са неточни. Има състезател/състезатели с точки равни на точките на състезателят на Трето място.';
      } else {
        this.sameResults3 = null;
      }
    }

  }
  errorCheck (form: NgForm, criteria) {
    if (form) {
      const keys = Object.keys(form.value);
    for (const key of keys) {
      if (form.value[key] === '' || form.value[key] === null) {
        this.errors = 'Моля попълнете всички полета.';
        (() => {
          setTimeout(() => {
            this.errors = null;
          }, 2000);
        })();
        return this.errors;
      }
    }
    }
    if (criteria) {
      if (isNaN(criteria)) {
        this.errors = 'Моля въведете числа за точки по критерии.';
        (() => {
          setTimeout(() => {
            this.errors = null;
          }, 2000);
        })();
        return this.errors;
      }
    }
  }
}

import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
    selector: 'app-team-wrapper',
    template: '<team-app></team-app>',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TeamWrapper { }
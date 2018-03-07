import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { IBird } from './index';
import { BirdService } from '../birds/bird.service';

@Component({
    selector: 'app-bird-detail',
    moduleId: module.id,
    templateUrl: 'bird-detail.component.html',
    styleUrls: ['bird-detail.component.css']
})
export class BirdDetailComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Details';
    bird: IBird;
    birdId: number;
    errorMessage: string;
    private sub: Subscription;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private birdService: BirdService) {

    }

    ngOnInit(): void {

        this.sub = this.route.params.subscribe(
            params => {
                this.birdId = +params['id'];
                this.getbirdDetails();
            });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    getbirdDetails(): void {
        this.birdService.getBird(this.birdId).subscribe(
            bird => this.bird = bird,
            error => this.errorMessage = <any>error);
    }

    OnBack(): void {
        this.router.navigate(['/birds']);
    }
}

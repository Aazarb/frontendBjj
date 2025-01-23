import { Component, OnInit } from '@angular/core';
import {customNavItems, navItems} from './sidebar-data';
import { NavService } from '../../../services/nav.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  navItems = customNavItems;

  constructor(public navService: NavService) {}

  ngOnInit(): void {}

  protected readonly customNavItems = customNavItems;
}

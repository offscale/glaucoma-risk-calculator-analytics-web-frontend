import { AfterContentInit, AfterViewInit, Component, Input, OnInit } from '@angular/core';

import { graphviz, GraphvizOptions } from 'd3-graphviz';

@Component({
  selector: 'app-graphviz',
  templateUrl: './graphviz.component.html',
  styleUrls: ['./graphviz.component.css']
})
export class GraphvizComponent implements OnInit, AfterViewInit, AfterContentInit {
  private static count = 0;
  private static defaultOptions: GraphvizOptions = {
    fit: true,
    height: 500,
    width: 1000,
    zoom: false,
  };

  private id: string;

  @Input('graph') graph: string;

  private props: IGraphvizProps;

  constructor() {
    this.id = 'graphviz' + GraphvizComponent.count;
    this.renderGraph();
    GraphvizComponent.count++;
  }

  ngOnInit() {
    this.props = { dot: this.graph };
    this.renderGraph();
  }

  ngAfterViewInit() {
    this.renderGraph();
  }

  ngAfterContentInit() {
    this.renderGraph();
  }

  private renderGraph() {
    if (!this.props || !this.props.dot) {
      this.props = {
        dot: this.graph
      };
    }
    if (document.getElementById(this.id))
      graphviz(`#${this.id}`)
        .options(this.options())
        .renderDot(this.props.dot);
  }

  private options(): GraphvizOptions {
    if (!this.props.options)
      return GraphvizComponent.defaultOptions;

    const options: GraphvizOptions = GraphvizComponent.defaultOptions;
    for (const option of Object.keys(this.props.options))
      options[option] = this.props.options[option];

    return options;
  }
}

export interface IGraphvizProps {
  dot: string;
  options?: GraphvizOptions;
}

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
    height: '100%',
    width: '500%',
    zoom: false,
  };

  public id: string;
  // private count: number = 0;

  @Input('graph') graph: string;
  @Input('callback') cb: () => void;

  // @Output() change: EventEmitter<number> = new EventEmitter<number>();

  private props: IGraphvizProps;

  constructor() {
    this.id = `graphviz${GraphvizComponent.count}`;
    this.renderGraph();
    GraphvizComponent.count++;
  }

  ngOnInit(): void {
    this.props = { dot: this.graph };
    this.renderGraph();
  }

  ngAfterViewInit(): void {
    this.renderGraph();
  }

  ngAfterContentInit(): void {
    this.renderGraph();
  }

  private renderGraph(): void {
    if (!this.props || !this.props.dot) {
      this.props = {
        dot: this.graph
      };
    }
    if (document.getElementById(this.id)) {
      graphviz(`#${this.id}`)
        .options(this.options())
        .renderDot(this.props.dot);
      // this.change.emit(++this.count);
      setTimeout(this.cb, 100);
    }
  }

  countChange(event): void {
    console.info('countChange::event', event, ';');
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

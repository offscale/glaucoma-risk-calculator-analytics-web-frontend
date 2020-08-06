import { AfterContentInit, AfterViewInit, Component, Input, OnInit } from '@angular/core';

import * as d3 from 'd3-selection';
import * as dagreD3 from 'dagre-d3';
import * as graphlibDot from 'graphlib-dot';

@Component({
  selector: 'app-graphviz',
  templateUrl: './graphviz.component.html',
  styleUrls: ['./graphviz.component.css']
})
export class GraphvizComponent implements OnInit, AfterViewInit, AfterContentInit {
  private static count = 0;

  public id: string;
  // private count: number = 0;

  @Input() graph: string;
  @Input() cb: () => void;

  // @Output() change: EventEmitter<number> = new EventEmitter<number>();

  private props: IGraphvizProps;

  constructor() {
    this.id = `graphviz${GraphvizComponent.count}`;
    // this.renderGraph();
    GraphvizComponent.count++;
  }

  ngOnInit(): void {
    this.props = { dot: this.graph };
    // this.renderGraph();
  }

  ngAfterViewInit(): void {
    // this.renderGraph();
  }

  ngAfterContentInit(): void {
    this.renderGraph();
  }

  private renderGraph(): void {
    // const graphLink = d3.select('#graphLink');
    const render = new dagreD3.render();
    const g = graphlibDot.read(this.graph);
    // console.info('graph:', this.graph, ';');
    // Set margins, if not present
    /*if (!g.graph().hasOwnProperty('marginx') &&
      !g.graph().hasOwnProperty('marginy')) {
      g.graph().marginx = 20;
      g.graph().marginy = 20;
    }*/

    // g.graph().transition = selection => selection.transition().duration(500);

    // Render the graph into svg g
    /*d3
      .select(`#${this.id}`
      .call(render as any, g);*/
    console.info('d3.selectAll("g"):', d3.selectAll('g'),
      `;\nd3.select(#${this.id} g):`, d3.select(`#${this.id} g`),
      ';\nd3.select(`svg g`):', d3.select(`svg g`), ';');
    const q = d3.select(`svg g`);
    /*
    const q = d3.select(`#${this.id} g`);
    */
    /*
    const q = d3.select(`#${this.id} g`);
    */
    /*q.call(render as any, g);*/
    // q.call(render as any, g);

    const renderer = new dagreD3.render();
    renderer(d3.select('svg g') as any, g as any);

    /*setTimeout(() => {
      const svg: SVGGraphicsElement = document.getElementById(this.id) as unknown as SVGGraphicsElement;
      const bbox = svg.getBBox();
      svg.style.width = `${bbox.width + 40.0}px`;
      svg.style.height = `${bbox.height + 40.0}px`;
    }, 1000);*/
  }
}

export interface IGraphvizProps {
  dot: string;
}

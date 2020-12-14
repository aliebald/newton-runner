import React, { ReactElement } from "react";
import Highcharts, { Chart } from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import HC_more from "highcharts/highcharts-more";
HC_more(Highcharts);

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("highcharts/modules/draggable-points")(Highcharts);

export interface GraphInputConfig {
	title?: string;
	xTitle: string;
	yTitle: string;
	minY: number;
	maxY: number;
	data: Array<{ y: number }>;
}

export default class GraphInput extends React.Component<
	{ cfg: GraphInputConfig },
	{ options: Highcharts.Options }
> {
	private internalChart!: Chart;

	private options: Highcharts.Options = {
		title: {
			text: this.props.cfg.title
		},
		yAxis: {
			title: {
				text: this.props.cfg.yTitle
			},
			min: this.props.cfg.minY,
			max: this.props.cfg.maxY
		},
		xAxis: {
			title: {
				text: this.props.cfg.xTitle
			}
		},
		tooltip: {
			formatter: function () {
				return this.y.toFixed(1);
			}
		},
		series: [
			{
				type: "line",
				dragDrop: {
					draggableY: true,
					dragPrecisionY: 0.1,
					dragMaxY: this.props.cfg.maxY,
					dragMinY: this.props.cfg.minY
				},
				showInLegend: false,
				data: this.props.cfg.data,
				zoneAxis: "x",
				zones: [{ value: 0 }, { value: 0, color: "red" }]
			}
		]
	};

	colorGraphUpToX(x: number): void {
		const series = this.options.series;
		if (series && series[0]) {
			// here should be some highcharts type, but it's not avaiable
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(series[0] as any).zones[1].value = x;
			this.internalChart.update(this.options);
		}
	}

	afterChartCreated(chart: Chart): void {
		this.internalChart = chart;
	}

	render(): ReactElement {
		return (
			<HighchartsReact
				constructorType={"chart"}
				callback={this.afterChartCreated.bind(this)}
				highcharts={Highcharts}
				options={this.options}
			/>
		);
	}
}

/* eslint-disable @typescript-eslint/no-explicit-any */
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
	fixedStart?: boolean;
	maxYDistance?: number;
	data: Array<{ y: number }>;
}

export default class GraphInput extends React.Component<
	{ cfg: GraphInputConfig },
	{ options: Highcharts.Options }
> {
	private internalChart!: Chart;
	private options: Highcharts.Options;

	constructor(props: { cfg: GraphInputConfig }) {
		super(props);
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const that = this;
		const options: Highcharts.Options = {
			title: {
				text: this.props.cfg.title
			},
			chart: {
				events: {
					click: function (event: any) {
						let newY: number = parseFloat(event.yAxis[0].value.toFixed(1));
						const pointIdx: number = Math.round(event.xAxis[0].value);
						const series = that.options.series;
						if (series && series[0]) {
							if (pointIdx == 0 && that.props.cfg.fixedStart) {
								return;
							}
							if (newY > props.cfg.maxY) {
								newY = props.cfg.maxY;
							}
							if (newY < props.cfg.minY) {
								newY = props.cfg.minY;
							}
							if (that.props.cfg.maxYDistance) {
								const distance = that.props.cfg.maxYDistance;
								const isLast = pointIdx == (series[0] as any).data.length - 1;
								const isFirst = pointIdx == 0;
								if (isFirst) {
									const first = newY;
									const second = (series[0] as any).data[1].y;
									if (Math.abs(first - second) <= distance) {
										(series[0] as any).data[pointIdx] = { y: newY };
									} else if (first < second) {
										(series[0] as any).data[pointIdx] = {
											y: second - distance
										};
									} else {
										(series[0] as any).data[pointIdx] = {
											y: second + distance
										};
									}
								} else if (isLast) {
									const last = newY;
									const before = (series[0] as any).data[pointIdx - 1].y;
									if (Math.abs(last - before) <= distance) {
										(series[0] as any).data[pointIdx] = { y: newY };
									} else if (before < last) {
										(series[0] as any).data[pointIdx] = {
											y: before + distance
										};
									} else {
										(series[0] as any).data[pointIdx] = {
											y: before - distance
										};
									}
								} else {
									const before = (series[0] as any).data[pointIdx - 1].y;
									const mid = newY;
									const after = (series[0] as any).data[pointIdx + 1].y;
									if (
										Math.abs(before - mid) <= distance &&
										Math.abs(after - mid) <= distance
									) {
										(series[0] as any).data[pointIdx] = { y: newY };
									} else {
										if (mid < before && before < after) {
											(series[0] as any).data[pointIdx] = {
												y: after - distance
											};
										} else if (mid < before && before > after) {
											(series[0] as any).data[pointIdx] = {
												y: before - distance
											};
										} else if (mid > before && before > after) {
											(series[0] as any).data[pointIdx] = {
												y: after + distance
											};
										} else {
											(series[0] as any).data[pointIdx] = {
												y: before + distance
											};
										}
									}
								}
								that.internalChart.update(that.options);
							} else {
								(series[0] as any).data[pointIdx] = { y: newY };
								that.internalChart.update(that.options);
							}
						}
					}
				}
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
				formatter: function (): string {
					let y: string = this.y.toFixed(1);
					const maxY: string = props.cfg.maxY.toFixed(1);
					const minY: string = props.cfg.minY.toFixed(1);
					if (this.x === 0 && props.cfg.fixedStart) {
						y = y.concat(" (FIXIERT)");
					}

					if (y === maxY) {
						y = y.concat(" (MAXIMUM)");
					} else if (y === minY) {
						y = y.concat(" (MINIMUM)");
					}

					return y;
				}
			},
			series: [
				{
					point: {
						events: {
							drag: function (e: any) {
								return that.correctDragPosition(this, e);
							},
							drop: function (e: any) {
								return that.correctDragPosition(this, e);
							}
						}
					},
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

		this.options = options;
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	correctDragPosition(point: Highcharts.Point, e: any): boolean {
		const newY: number = parseFloat(e.newPoint.y.toFixed(1));
		const pointIdx: number = Math.round(point.x);
		const series = this.options.series;
		if (series && series[0]) {
			if (pointIdx == 0 && this.props.cfg.fixedStart) {
				return false;
			}
			if (this.props.cfg.maxYDistance) {
				const distance = this.props.cfg.maxYDistance;
				const isLast = pointIdx == (series[0] as any).data.length - 1;
				const isFirst = pointIdx == 0;
				if (isFirst) {
					const first = newY;
					const second = (series[0] as any).data[1].y;
					return Math.abs(first - second) <= distance;
				} else if (isLast) {
					const last = newY;
					const before = (series[0] as any).data[pointIdx - 1].y;
					return Math.abs(last - before) <= distance;
				} else {
					const before = (series[0] as any).data[pointIdx - 1].y;
					const mid = newY;
					const after = (series[0] as any).data[pointIdx + 1].y;
					return Math.abs(before - mid) <= distance && Math.abs(after - mid) <= distance;
				}
			} else {
				return true;
			}
		}
		return false;
	}

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

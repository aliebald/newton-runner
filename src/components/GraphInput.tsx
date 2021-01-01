/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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
						const data = that.props.cfg.data;
						if (pointIdx === 0 && that.props.cfg.fixedStart) {
							return;
						}

						if (newY > props.cfg.maxY) {
							newY = props.cfg.maxY;
						} else if (newY < props.cfg.minY) {
							newY = props.cfg.minY;
						}

						if (that.props.cfg.maxYDistance) {
							const distance = that.props.cfg.maxYDistance;
							if (
								Math.abs(newY - data[0].y) > pointIdx * distance &&
								that.props.cfg.fixedStart
							) {
								if (newY > data[0].y) {
									newY = data[0].y + pointIdx * distance;
								} else {
									newY = data[0].y - pointIdx * distance;
								}
							}
							if (pointIdx === 0) {
								data[pointIdx].y = newY;
								that.internalChart.update(that.options);
								that.applyMaxDistanceToPoint(1, false);
								return;
							} else if (pointIdx === data.length - 1) {
								data[pointIdx].y = newY;
								that.internalChart.update(that.options);
								that.applyMaxDistanceToPoint(pointIdx - 1, true);
							} else {
								data[pointIdx].y = newY;
								that.internalChart.update(that.options);
								that.applyMaxDistanceToPoint(pointIdx + 1, false);
								that.applyMaxDistanceToPoint(pointIdx - 1, true);
							}
						} else {
							data[pointIdx].y = newY;
							that.internalChart.update(that.options);
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

	/** Checks wether maxYDistance to neighbour of the point is satisfied
	 *  (see @param rightOrientation).
	 * Calls itself to other neighbour to update restriction.
	 * Point is specified by @param idx
	 */
	applyMaxDistanceToPoint(idx: number, rightOrientation: boolean): void {
		const yData = this.props.cfg.data[idx];
		const neighborYData = rightOrientation
			? this.props.cfg.data[idx + 1]
			: this.props.cfg.data[idx - 1];
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const distance = this.props.cfg.maxYDistance!;

		if (Math.abs(yData.y - neighborYData.y) > distance) {
			if (yData.y < neighborYData.y) {
				yData.y = neighborYData.y - distance;
			} else {
				yData.y = neighborYData.y + distance;
			}
			this.internalChart.update(this.options);

			if (rightOrientation) {
				if (idx === 0) {
					return;
				} else {
					this.applyMaxDistanceToPoint(idx - 1, rightOrientation);
				}
			} else {
				if (idx === this.props.cfg.data.length - 1) {
					return;
				} else {
					this.applyMaxDistanceToPoint(idx + 1, rightOrientation);
				}
			}
		}
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

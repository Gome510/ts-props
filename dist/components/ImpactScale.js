// @ts-nocheck
import React, { useCallback } from "react";
import { scaleLinear, scaleQuantize } from "d3-scale";
import { useTranslation } from "react-i18next";
import { ClipPath, G, Polygon, Rect, Svg, Text } from "../elements";
import { withErrorBoundary } from "../hoc";
import { useToken } from "../hooks";
import { clamp, isNumber } from "../utils";
const ImpactScale = (props) => {
    const { value, range, testID, width } = props;
    const token = useToken();
    const { t } = useTranslation();
    const scaleBucket = scaleQuantize()
        .domain(range)
        .range(["success", "caution", "warning"]);
    const bucket = scaleBucket(value ?? 0);
    const sectionColor = useCallback((section) => {
        const tokenName = section === "success" ? "positive" : section;
        return token(`adc.colors.support.${tokenName}.${bucket === section && isNumber(value) ? "default" : "surface"}`);
    }, [token, bucket, value]);
    const height = 54;
    const xRange = [0, width];
    const xScale = scaleLinear().domain(range).range(xRange);
    const x = xScale(value ?? 0);
    const caretHeight = 8;
    const caretWidth = 16;
    const caretVerticalPadding = 2;
    const caretXMin = caretWidth / 2;
    const caretXMax = width - caretWidth / 2;
    const caretX = clamp(x, caretXMin, caretXMax);
    const labelHeight = 32;
    const labelWidth = 71;
    const labelY = 0;
    const labelXMin = labelWidth / 2;
    const labelXMax = width - labelWidth / 2;
    const labelX = clamp(x, labelXMin, labelXMax);
    const scaleHeight = 8;
    const scaleWidth = width;
    const sectionWidth = (scaleWidth - 2) / 3;
    const r = scaleHeight / 2;
    const scaleVerticalPadding = 4;
    const scaleY = labelY +
        labelHeight +
        caretVerticalPadding +
        caretHeight +
        scaleVerticalPadding;
    return (<Svg height={height} width={width} testID={testID}>
      <ClipPath id={"clip-impact"}>
        <Rect x={0} y={scaleY} rx={r} height={scaleHeight} width={scaleWidth}/>
      </ClipPath>
      <Rect x={0} y={scaleY} fill={sectionColor("success")} height={scaleHeight} width={sectionWidth} clipPath={"url(#clip-impact)"} testID={`${testID}-left`}/>
      <Rect x={sectionWidth + 1} y={scaleY} fill={sectionColor("caution")} height={scaleHeight} width={sectionWidth} clipPath={"url(#clip-impact)"} testID={`${testID}-middle`}/>
      <Rect x={2 * (sectionWidth + 1)} y={scaleY} fill={sectionColor("warning")} height={scaleHeight} width={sectionWidth} clipPath={"url(#clip-impact)"} testID={`${testID}-right`}/>

      {isNumber(value) && bucket && (<>
          <G x={caretX - caretWidth / 2} y={labelY + labelHeight + caretVerticalPadding}>
            <Polygon stroke={token("adc.colors.neutral.90")} fill={token("adc.colors.neutral.90")} stroke-linejoin="round" points="0,0 16,0 8,8" testID={`${testID}-arrow`}/>
          </G>
          <G x={labelX - labelWidth / 2} y={0} testID={`${testID}-label`}>
            <Rect width={labelWidth} height={labelHeight} rx={r} fill={sectionColor(bucket || "success")} testID={`${testID}-label-background`}/>
            <Text x={labelWidth / 2} y={labelHeight / 2} textAnchor="middle" alignmentBaseline="central" fontWeight={token("adc.fonts.typography.bodySmall.strong").fontWeight} fontSize={token("adc.fonts.typography.bodySmall.strong").fontSize} testID={`${testID}-text`}>
              {t(`impactScale.${bucket}`)}
            </Text>
          </G>
        </>)}
    </Svg>);
};
export default withErrorBoundary(ImpactScale);
//# sourceMappingURL=ImpactScale.js.map
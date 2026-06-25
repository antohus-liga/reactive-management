package org.napetrico.backend.common.parsers

import java.math.BigDecimal
import java.math.MathContext
import java.math.RoundingMode

object SellingMarginParser {
    fun parseToBigDecimal(sellingMargin: String): BigDecimal =
        sellingMargin
            .removeSuffix("%")
            .toBigDecimal()
            .movePointLeft(2)
}
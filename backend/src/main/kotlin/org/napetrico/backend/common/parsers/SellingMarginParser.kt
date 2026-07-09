package org.napetrico.backend.common.parsers

import java.math.BigDecimal

object SellingMarginParser {
    fun parseToBigDecimal(sellingMargin: String): BigDecimal =
        sellingMargin
            .removeSuffix("%")
            .toBigDecimal()
            .movePointLeft(2)
            .stripTrailingZeros()
}
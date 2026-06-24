package org.napetrico.backend.common.parsers

import org.napetrico.backend.common.values.SellingMargin
import java.math.BigDecimal

object SellingMarginParser {
    fun parseToBigDecimal(sellingMargin: SellingMargin): BigDecimal {
        val noPercentSign = sellingMargin.toString().replace("%", "")
        return (noPercentSign.toInt() / 100).toBigDecimal()
    }
}
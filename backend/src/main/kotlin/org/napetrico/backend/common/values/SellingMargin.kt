package org.napetrico.backend.common.values

import org.napetrico.backend.common.parsers.SellingMarginParser
import java.math.BigDecimal

@JvmInline
value class SellingMargin(val value: BigDecimal) {

    fun from(value: String): SellingMargin {
        require(value.matches(Regex("^\\d+(\\.\\d+)?%$"))) {
            "Invalid SellingMargin format: $value (expected digits, optional decimal, ending with %)"
        }
        return SellingMargin(SellingMarginParser.parseToBigDecimal(value))
    }

    fun from(value: BigDecimal): SellingMargin {
        return SellingMargin(value)
    }
}

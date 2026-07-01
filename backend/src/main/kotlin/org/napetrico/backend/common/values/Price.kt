package org.napetrico.backend.common.values

import java.math.BigDecimal
import java.math.RoundingMode

@JvmInline
value class Price(val value: BigDecimal) {

    init {
        require(isValid(value)) {
            "Invalid price: must have at most 2 decimal places"
        }
    }

    companion object {

        fun from(value: String): Price {
            val bd = value.toBigDecimalOrNull()
                ?: throw IllegalArgumentException("Invalid number format: $value")

            return Price(bd)
        }

        fun from(value: BigDecimal): Price {
            return Price(value)
        }

        private fun isValid(value: BigDecimal): Boolean {
            return value.scale() <= 2
        }
    }
}

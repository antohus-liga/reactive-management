package org.napetrico.backend.common.parsers
import org.napetrico.backend.common.values.Discount
import org.napetrico.backend.common.values.Price
import java.math.BigDecimal

object DiscountParser {

    /**
     * Parses a Discount into a list of percentages.
     *
     * Example:
     * "20%+9.75%+2%" -> [20.0, 9.75, 2.0]
     */
    fun parse(discount: Discount): List<Double> =
        discount.value
            .split("+")
            .map { it.removeSuffix("%").toDouble() }

    /**
     * Calculates the effective compound discount.
     *
     * Example:
     * 20%+10% = 28%
     */
    fun effectiveDiscount(discount: Discount): Double {
        val remainingFactor = parse(discount)
            .fold(1.0) { remaining, percentage ->
                remaining * (1 - percentage / 100)
            }

        return (1 - remainingFactor) * 100
    }

    /**
     * Applies the compound discount to an amount.
     */
    fun apply(discount: Discount, price: Price): Price {
        val effectiveDiscountPercentage = effectiveDiscount(discount)
        val remainingFactor = 1 - (effectiveDiscountPercentage / 100)

        return Price.from(price.value.multiply(BigDecimal(remainingFactor)))
    }
}

package org.napetrico.backend.common.values

@JvmInline
value class SellingMargin(val value: String) {

    init {
        require(value.matches(Regex("^\\d+(\\.\\d+)?%$"))) {
            "Invalid SellingMargin format: $value (expected digits, optional decimal, ending with %)"
        }
    }

    override fun toString(): String = value
}

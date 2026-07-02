package org.napetrico.backend.common.values

@JvmInline
value class Discount(val value: String) {

    init {
        require(isValid(value)) {
            "Invalid discount format (valid example: 2%+1.5%)"
        }
    }

    companion object {
        private val regex = Regex(
            "^(?:0\\.\\d*[1-9]\\d*|[1-9]\\d*(?:\\.\\d+)?)%(?:\\+(?:0\\.\\d*[1-9]\\d*|[1-9]\\d*(?:\\.\\d+)?)%)*$"
        )

        fun from(value: String): Discount = Discount(value)

        fun isValid(value: String): Boolean =
            regex.matches(value)
    }

    override fun toString(): String = value
}

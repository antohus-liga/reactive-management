package org.napetrico.backend.features.materials.dto

import org.napetrico.backend.common.enums.MeasurementType
import java.math.BigDecimal
import java.util.UUID

open class MaterialRequest (
    open val description: String,
    open val categoryPublicId: UUID,
    open val measurement: MeasurementType,
    open val unitPrice: BigDecimal,
)
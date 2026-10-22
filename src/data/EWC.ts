const EWC = [
	{
		id: 1,
		label:
			'WASTES RESULTING FROM EXPLORATION, MINING, QUARRYING, AND PHYSICAL AND CHEMICAL TREATMENT OF MINERALS',
		subcategories: [
			{
				label: 'Wastes from mineral excavation',
				codes: [
					{
						code: '01 01 01',
						description: 'Wastes from mineral metalliferous excavation',
						type: 'Non-Hazardous',
						axis: 'waste:W-010101-Non-Hazardous-WastesFromMineralMetalliferousExcavationMember',
					},
					{
						code: '01 01 02',
						description: 'Wastes from mineral non-metalliferous excavation',
						type: 'Non-Hazardous',
						axis: 'waste:W-010102-Non-Hazardous-WastesFromMineralNon-MetalliferousExcavationMember',
					},
				],
			},
			{
				label:
					'Wastes from physical and chemical processing of metalliferous minerals',
				codes: [
					{
						code: '01 03 04',
						description:
							'Acid-generating tailings from processing of sulphide ore',
						type: 'Hazardous',
						axis: 'waste:W-010304-Hazardous-Acid-GeneratingTailingsFromProcessingOfSulphideOreMember',
					},
					{
						code: '01 03 05',
						description: 'Other tailings containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-010305-Hazardous-OtherTailingsContainingHazardousSubstancesMember',
					},
					{
						code: '01 03 06',
						description:
							'Tailings other than those mentioned in 01 03 04 and 01 03 05',
						type: 'Non-Hazardous',
						axis: 'waste:W-010306-Non-Hazardous-TailingsOtherThanThoseMentionedIn010304And010305Member',
					},
					{
						code: '01 03 07',
						description:
							'Other wastes containing hazardous substances from physical and chemical processing of metalliferous minerals',
						type: 'Hazardous',
						axis: 'waste:W-010307-Hazardous-OtherWastesContainingHazardousSubstancesFromPhysicalAndChemicalProcessingOfMetalliferousMineralsMember',
					},
					{
						code: '01 03 08',
						description:
							'Dusty and powdery wastes other than those mentioned in 01 03 07',
						type: 'Non-Hazardous',
						axis: 'waste:W-010308-Non-Hazardous-DustyAndPowderyWastesOtherThanThoseMentionedIn010307Member',
					},
					{
						code: '01 03 09',
						description:
							'Red mud from alumina production other than the wastes mentioned in 01 03 10',
						type: 'Non-Hazardous',
						axis: 'waste:W-010309-Non-Hazardous-RedMudFromAluminaProductionOtherThanTheWastesMentionedIn010310Member',
					},
					{
						code: '01 03 10',
						description:
							'Red mud from alumina production containing hazardous substances other than the wastes mentioned in 01 03 07',
						type: 'Hazardous',
						axis: 'waste:W-010310-Hazardous-RedMudFromAluminaProductionContainingHazardousSubstancesOtherThanTheWastesMentionedIn010307Member',
					},
					{
						code: '01 03 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-010399-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label:
					'Wastes from physical and chemical processing of non-metalliferous minerals',
				codes: [
					{
						code: '01 04 07',
						description:
							'Wastes containing hazardous substances from physical and chemical processing of non-metalliferous minerals',
						type: 'Hazardous',
						axis: 'waste:W-010407-Hazardous-WastesContainingHazardousSubstancesFromPhysicalAndChemicalProcessingOfNon-MetalliferousMineralsMember',
					},
					{
						code: '01 04 08',
						description:
							'Waste gravel and crushed rocks other than those mentioned in 01 04 07',
						type: 'Non-Hazardous',
						axis: 'waste:W-010408-Non-Hazardous-WasteGravelAndCrushedRocksOtherThanThoseMentionedIn010407Member',
					},
					{
						code: '01 04 09',
						description: 'Waste sand and clays',
						type: 'Non-Hazardous',
						axis: 'waste:W-010409-Non-Hazardous-WasteSandAndClaysMember',
					},
					{
						code: '01 04 10',
						description:
							'Dusty and powdery wastes other than those mentioned in 01 04 07',
						type: 'Non-Hazardous',
						axis: 'waste:W-010410-Non-Hazardous-DustyAndPowderyWastesOtherThanThoseMentionedIn010407Member',
					},
					{
						code: '01 04 11',
						description:
							'Wastes from potash and rock salt processing other than those mentioned in 01 04 07',
						type: 'Non-Hazardous',
						axis: 'waste:W-010411-Non-Hazardous-WastesFromPotashAndRockSaltProcessingOtherThanThoseMentionedIn010407Member',
					},
					{
						code: '01 04 12',
						description:
							'Tailings and other wastes from washing and cleaning of minerals other than those mentioned in 01 04 07 and 01 04 11',
						type: 'Non-Hazardous',
						axis: 'waste:W-010412-Non-Hazardous-TailingsAndOtherWastesFromWashingAndCleaningOfMineralsOtherThanThoseMentionedIn010407And010411Member',
					},
					{
						code: '01 04 13',
						description:
							'Wastes from stone cutting and sawing other than those mentioned in 01 04 07',
						type: 'Non-Hazardous',
						axis: 'waste:W-010413-Non-Hazardous-WastesFromStoneCuttingAndSawingOtherThanThoseMentionedIn010407Member',
					},
					{
						code: '01 04 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-010499-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Drilling muds and other drilling wastes',
				codes: [
					{
						code: '01 05 04',
						description: 'Freshwater drilling muds and wastes',
						type: 'Non-Hazardous',
						axis: 'waste:W-010504-Non-Hazardous-FreshwaterDrillingMudsAndWastesMember',
					},
					{
						code: '01 05 05',
						description: 'Oil-containing drilling muds and wastes',
						type: 'Hazardous',
						axis: 'waste:W-010505-Hazardous-Oil-ContainingDrillingMudsAndWastesMember',
					},
					{
						code: '01 05 06',
						description:
							'Drilling muds and other drilling wastes containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-010506-Hazardous-DrillingMudsAndOtherDrillingWastesContainingHazardousSubstancesMember',
					},
					{
						code: '01 05 07',
						description:
							'Barite-containing drilling muds and wastes other than those mentioned in 01 05 05 and 01 05 06',
						type: 'Non-Hazardous',
						axis: 'waste:W-010507-Non-Hazardous-Barite-ContainingDrillingMudsAndWastesOtherThanThoseMentionedIn010505And010506Member',
					},
					{
						code: '01 05 08',
						description:
							'Chloride-containing drilling muds and wastes other than those mentioned in 01 05 05 and 01 05 06',
						type: 'Non-Hazardous',
						axis: 'waste:W-010508-Non-Hazardous-Chloride-ContainingDrillingMudsAndWastesOtherThanThoseMentionedIn010505And010506Member',
					},
					{
						code: '01 05 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-010599-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
		],
	},
	{
		id: 2,
		label:
			'WASTES FROM AGRICULTURE, HORTICULTURE, AQUACULTURE, FORESTRY, HUNTING AND FISHING, FOOD PREPARATION AND PROCESSING',
		subcategories: [
			{
				label:
					'Wastes from agriculture, horticulture, aquaculture, forestry, hunting and fishing',
				codes: [
					{
						code: '02 01 01',
						description: 'Sludges from washing and cleaning',
						type: 'Non-Hazardous',
						axis: 'waste:W-020101-Non-Hazardous-SludgesFromWashingAndCleaningMember',
					},
					{
						code: '02 01 02',
						description: 'Animal-tissue waste',
						type: 'Non-Hazardous',
						axis: 'waste:W-020102-Non-Hazardous-Animal-TissueWasteMember',
					},
					{
						code: '02 01 03',
						description: 'Plant-tissue waste',
						type: 'Non-Hazardous',
						axis: 'waste:W-020103-Non-Hazardous-Plant-TissueWasteMember',
					},
					{
						code: '02 01 04',
						description: 'Waste plastics (except packaging)',
						type: 'Non-Hazardous',
						axis: 'waste:W-020104-Non-Hazardous-WastePlasticsExceptPackagingMember',
					},
					{
						code: '02 01 06',
						description:
							'Animal faeces, urine and manure (including spoiled straw), effluent, collected separately and treated off-site',
						type: 'Non-Hazardous',
						axis: 'waste:W-020106-Non-Hazardous-AnimalFaecesUrineAndManureIncludingSpoiledStrawEffluentCollectedSeparatelyAndTreatedOff-SiteMember',
					},
					{
						code: '02 01 07',
						description: 'Wastes from forestry',
						type: 'Non-Hazardous',
						axis: 'waste:W-020107-Non-Hazardous-WastesFromForestryMember',
					},
					{
						code: '02 01 08',
						description: 'Agrochemical waste containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-020108-Hazardous-AgrochemicalWasteContainingHazardousSubstancesMember',
					},
					{
						code: '02 01 09',
						description:
							'Agrochemical waste other than those mentioned in 02 01 08',
						type: 'Non-Hazardous',
						axis: 'waste:W-020109-Non-Hazardous-AgrochemicalWasteOtherThanThoseMentionedIn020108Member',
					},
					{
						code: '02 01 10',
						description: 'Waste metal',
						type: 'Non-Hazardous',
						axis: 'waste:W-020110-Non-Hazardous-WasteMetalMember',
					},
					{
						code: '02 01 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-020199-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label:
					'Wastes from the preparation and processing of meat, fish and other foods of animal origin',
				codes: [
					{
						code: '02 02 01',
						description: 'Sludges from washing and cleaning',
						type: 'Non-Hazardous',
						axis: 'waste:W-020201-Non-Hazardous-SludgesFromWashingAndCleaningMember',
					},
					{
						code: '02 02 02',
						description: 'Animal-tissue waste',
						type: 'Non-Hazardous',
						axis: 'waste:W-020202-Non-Hazardous-Animal-TissueWasteMember',
					},
					{
						code: '02 02 03',
						description: 'Materials unsuitable for consumption or processing',
						type: 'Non-Hazardous',
						axis: 'waste:W-020203-Non-Hazardous-MaterialsUnsuitableForConsumptionOrProcessingMember',
					},
					{
						code: '02 02 04',
						description: 'Sludges from on-site effluent treatment',
						type: 'Non-Hazardous',
						axis: 'waste:W-020204-Non-Hazardous-SludgesFromOn-SiteEffluentTreatmentMember',
					},
					{
						code: '02 02 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-020299-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label:
					'Wastes from fruit, vegetables, cereals, edible oils, cocoa, coffee, tea and tobacco preparation and processing; conserve production; yeast and yeast extract production, molasses preparation and fermentation',
				codes: [
					{
						code: '02 03 01',
						description:
							'Sludges from washing, cleaning, peeling, centrifuging and separation',
						type: 'Non-Hazardous',
						axis: 'waste:W-020301-Non-Hazardous-SludgesFromWashingCleaningPeelingCentrifugingAndSeparationMember',
					},
					{
						code: '02 03 02',
						description: 'Wastes from preserving agents',
						type: 'Non-Hazardous',
						axis: 'waste:W-020302-Non-Hazardous-WastesFromPreservingAgentsMember',
					},
					{
						code: '02 03 03',
						description: 'Wastes from solvent extraction',
						type: 'Non-Hazardous',
						axis: 'waste:W-020303-Non-Hazardous-WastesFromSolventExtractionMember',
					},
					{
						code: '02 03 04',
						description: 'Materials unsuitable for consumption or processing',
						type: 'Non-Hazardous',
						axis: 'waste:W-020304-Non-Hazardous-MaterialsUnsuitableForConsumptionOrProcessingMember',
					},
					{
						code: '02 03 05',
						description: 'Sludges from on-site effluent treatment',
						type: 'Non-Hazardous',
						axis: 'waste:W-020305-Non-Hazardous-SludgesFromOn-SiteEffluentTreatmentMember',
					},
					{
						code: '02 03 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-020399-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Wastes from sugar processing',
				codes: [
					{
						code: '02 04 01',
						description: 'Soil from cleaning and washing beet',
						type: 'Non-Hazardous',
						axis: 'waste:W-020401-Non-Hazardous-SoilFromCleaningAndWashingBeetMember',
					},
					{
						code: '02 04 02',
						description: 'Off-specification calcium carbonate',
						type: 'Non-Hazardous',
						axis: 'waste:W-020402-Non-Hazardous-Off-SpecificationCalciumCarbonateMember',
					},
					{
						code: '02 04 03',
						description: 'Sludges from on-site effluent treatment',
						type: 'Non-Hazardous',
						axis: 'waste:W-020403-Non-Hazardous-SludgesFromOn-SiteEffluentTreatmentMember',
					},
					{
						code: '02 04 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-020499-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Wastes from the dairy products industry',
				codes: [
					{
						code: '02 05 01',
						description: 'Materials unsuitable for consumption or processing',
						type: 'Non-Hazardous',
						axis: 'waste:W-020501-Non-Hazardous-MaterialsUnsuitableForConsumptionOrProcessingMember',
					},
					{
						code: '02 05 02',
						description: 'Sludges from on-site effluent treatment',
						type: 'Non-Hazardous',
						axis: 'waste:W-020502-Non-Hazardous-SludgesFromOn-SiteEffluentTreatmentMember',
					},
					{
						code: '02 05 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-020599-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Wastes from the baking and confectionery industry',
				codes: [
					{
						code: '02 06 01',
						description: 'Materials unsuitable for consumption or processing',
						type: 'Non-Hazardous',
						axis: 'waste:W-020601-Non-Hazardous-MaterialsUnsuitableForConsumptionOrProcessingMember',
					},
					{
						code: '02 06 02',
						description: 'Wastes from preserving agents',
						type: 'Non-Hazardous',
						axis: 'waste:W-020602-Non-Hazardous-WastesFromPreservingAgentsMember',
					},
					{
						code: '02 06 03',
						description: 'Sludges from on-site effluent treatment',
						type: 'Non-Hazardous',
						axis: 'waste:W-020603-Non-Hazardous-SludgesFromOn-SiteEffluentTreatmentMember',
					},
					{
						code: '02 06 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-020699-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label:
					'Wastes from the production of alcoholic and non-alcoholic beverages (except coffee, tea and cocoa)',
				codes: [
					{
						code: '02 07 01',
						description:
							'Wastes from washing, cleaning and mechanical reduction of raw materials',
						type: 'Non-Hazardous',
						axis: 'waste:W-020701-Non-Hazardous-WastesFromWashingCleaningAndMechanicalReductionOfRawMaterialsMember',
					},
					{
						code: '02 07 02',
						description: 'Wastes from spirits distillation',
						type: 'Non-Hazardous',
						axis: 'waste:W-020702-Non-Hazardous-WastesFromSpiritsDistillationMember',
					},
					{
						code: '02 07 03',
						description: 'Wastes from chemical treatment',
						type: 'Non-Hazardous',
						axis: 'waste:W-020703-Non-Hazardous-WastesFromChemicalTreatmentMember',
					},
					{
						code: '02 07 04',
						description: 'Materials unsuitable for consumption or processing',
						type: 'Non-Hazardous',
						axis: 'waste:W-020704-Non-Hazardous-MaterialsUnsuitableForConsumptionOrProcessingMember',
					},
					{
						code: '02 07 05',
						description: 'Sludges from on-site effluent treatment',
						type: 'Non-Hazardous',
						axis: 'waste:W-020705-Non-Hazardous-SludgesFromOn-SiteEffluentTreatmentMember',
					},
					{
						code: '02 07 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-020799-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
		],
	},
	{
		id: 3,
		label:
			'WASTES FROM WOOD PROCESSING AND THE PRODUCTION OF PANELS AND FURNITURE, PULP, PAPER AND CARDBOARD',
		subcategories: [
			{
				label:
					'Wastes from wood processing and the production of panels and furniture',
				codes: [
					{
						code: '03 01 01',
						description: 'Waste bark and cork',
						type: 'Non-Hazardous',
						axis: 'waste:W-030101-Non-Hazardous-WasteBarkAndCorkMember',
					},
					{
						code: '03 01 04',
						description:
							'Sawdust, shavings, cuttings, wood, particle board and veneer containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-030104-Hazardous-SawdustShavingsCuttingsWoodParticleBoardAndVeneerContainingHazardousSubstancesMember',
					},
					{
						code: '03 01 05',
						description:
							'Sawdust, shavings, cuttings, wood, particle board and veneer other than those mentioned in 03 01 04',
						type: 'Non-Hazardous',
						axis: 'waste:W-030105-Non-Hazardous-SawdustShavingsCuttingsWoodParticleBoardAndVeneerOtherThanThoseMentionedIn030104Member',
					},
					{
						code: '03 01 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-030199-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Wastes from wood preservation',
				codes: [
					{
						code: '03 02 01',
						description: 'Non-halogenated organic wood preservatives',
						type: 'Hazardous',
						axis: 'waste:W-030201-Hazardous-Non-HalogenatedOrganicWoodPreservativesMember',
					},
					{
						code: '03 02 02',
						description: 'Organochlorinated wood preservatives',
						type: 'Hazardous',
						axis: 'waste:W-030202-Hazardous-OrganochlorinatedWoodPreservativesMember',
					},
					{
						code: '03 02 03',
						description: 'Organometallic wood preservatives',
						type: 'Hazardous',
						axis: 'waste:W-030203-Hazardous-OrganometallicWoodPreservativesMember',
					},
					{
						code: '03 02 04',
						description: 'Inorganic wood preservatives',
						type: 'Hazardous',
						axis: 'waste:W-030204-Hazardous-InorganicWoodPreservativesMember',
					},
					{
						code: '03 02 05',
						description:
							'Other wood preservatives containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-030205-Hazardous-OtherWoodPreservativesContainingHazardousSubstancesMember',
					},
					{
						code: '03 02 99',
						description: 'Wood preservatives not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-030299-Non-Hazardous-WoodPreservativesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label:
					'Wastes from pulp, paper and cardboard production and processing',
				codes: [
					{
						code: '03 03 01',
						description: 'Waste bark and wood',
						type: 'Non-Hazardous',
						axis: 'waste:W-030301-Non-Hazardous-WasteBarkAndWoodMember',
					},
					{
						code: '03 03 02',
						description:
							'Green liquor sludge (from recovery of cooking liquor)',
						type: 'Non-Hazardous',
						axis: 'waste:W-030302-Non-Hazardous-GreenLiquorSludgeFromRecoveryOfCookingLiquorMember',
					},
					{
						code: '03 03 05',
						description: 'De-inking sludges from paper recycling',
						type: 'Non-Hazardous',
						axis: 'waste:W-030305-Non-Hazardous-De-InkingSludgesFromPaperRecyclingMember',
					},
					{
						code: '03 03 07',
						description:
							'Mechanically separated rejects from pulping of waste paper and cardboard',
						type: 'Non-Hazardous',
						axis: 'waste:W-030307-Non-Hazardous-MechanicallySeparatedRejectsFromPulpingOfWastePaperAndCardboardMember',
					},
					{
						code: '03 03 08',
						description:
							'Wastes from sorting of paper and cardboard destined for recycling',
						type: 'Non-Hazardous',
						axis: 'waste:W-030308-Non-Hazardous-WastesFromSortingOfPaperAndCardboardDestinedForRecyclingMember',
					},
					{
						code: '03 03 09',
						description: 'Lime mud waste',
						type: 'Non-Hazardous',
						axis: 'waste:W-030309-Non-Hazardous-LimeMudWasteMember',
					},
					{
						code: '03 03 10',
						description:
							'Fibre rejects, fibre-, filler- and coating-sludges from mechanical separation',
						type: 'Non-Hazardous',
						axis: 'waste:W-030310-Non-Hazardous-FibreRejectsFibre-Filler-AndCoating-SludgesFromMechanicalSeparationMember',
					},
					{
						code: '03 03 11',
						description:
							'Sludges from on-site effluent treatment other than those mentioned in 03 03 10',
						type: 'Non-Hazardous',
						axis: 'waste:W-030311-Non-Hazardous-SludgesFromOn-SiteEffluentTreatmentOtherThanThoseMentionedIn030310Member',
					},
					{
						code: '03 03 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-030399-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
		],
	},
	{
		id: 4,
		label: 'WASTES FROM THE LEATHER, FUR AND TEXTILE INDUSTRIES',
		subcategories: [
			{
				label: 'Wastes from the leather and fur industry',
				codes: [
					{
						code: '04 01 01',
						description: 'Fleshings and lime split wastes',
						type: 'Non-Hazardous',
						axis: 'waste:W-040101-Non-Hazardous-FleshingsAndLimeSplitWastesMember',
					},
					{
						code: '04 01 02',
						description: 'Liming waste',
						type: 'Non-Hazardous',
						axis: 'waste:W-040102-Non-Hazardous-LimingWasteMember',
					},
					{
						code: '04 01 03',
						description:
							'Degreasing wastes containing solvents without a liquid phase',
						type: 'Hazardous',
						axis: 'waste:W-040103-Hazardous-DegreasingWastesContainingSolventsWithoutALiquidPhaseMember',
					},
					{
						code: '04 01 04',
						description: 'Tanning liquor containing chromium',
						type: 'Non-Hazardous',
						axis: 'waste:W-040104-Non-Hazardous-TanningLiquorContainingChromiumMember',
					},
					{
						code: '04 01 05',
						description: 'Tanning liquor free of chromium',
						type: 'Non-Hazardous',
						axis: 'waste:W-040105-Non-Hazardous-TanningLiquorFreeOfChromiumMember',
					},
					{
						code: '04 01 06',
						description:
							'Sludges in particular from on-site effluent treatment containing chromium',
						type: 'Non-Hazardous',
						axis: 'waste:W-040106-Non-Hazardous-SludgesInParticularFromOn-SiteEffluentTreatmentContainingChromiumMember',
					},
					{
						code: '04 01 07',
						description:
							'Sludges in particular from on-site effluent treatment free of chromium',
						type: 'Non-Hazardous',
						axis: 'waste:W-040107-Non-Hazardous-SludgesInParticularFromOn-SiteEffluentTreatmentFreeOfChromiumMember',
					},
					{
						code: '04 01 08',
						description:
							'Waste tanned leather blue sheetings shavings cuttings buffing dust containing chromium',
						type: 'Non-Hazardous',
						axis: 'waste:W-040108-Non-Hazardous-WasteTannedLeatherBlueSheetingsShavingsCuttingsBuffingDustContainingChromiumMember',
					},
					{
						code: '04 01 09',
						description: 'Wastes from dressing and finishing',
						type: 'Non-Hazardous',
						axis: 'waste:W-040109-Non-Hazardous-WastesFromDressingAndFinishingMember',
					},
					{
						code: '04 01 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-040199-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Wastes from the textile industry',
				codes: [
					{
						code: '04 02 09',
						description:
							'Wastes from composite materials impregnated textile elastomer plastomer',
						type: 'Non-Hazardous',
						axis: 'waste:W-040209-Non-Hazardous-WastesFromCompositeMaterialsImpregnatedTextileElastomerPlastomerMember',
					},
					{
						code: '04 02 10',
						description:
							'Organic matter from natural products for example grease wax',
						type: 'Non-Hazardous',
						axis: 'waste:W-040210-Non-Hazardous-OrganicMatterFromNaturalProductsForExampleGreaseWaxMember',
					},
					{
						code: '04 02 14',
						description: 'Wastes from finishing containing organic solvents',
						type: 'Hazardous',
						axis: 'waste:W-040214-Hazardous-WastesFromFinishingContainingOrganicSolventsMember',
					},
					{
						code: '04 02 15',
						description:
							'Wastes from finishing other than those mentioned in 04 02 14',
						type: 'Non-Hazardous',
						axis: 'waste:W-040215-Non-Hazardous-WastesFromFinishingOtherThanThoseMentionedIn040214Member',
					},
					{
						code: '04 02 16',
						description:
							'Dyestuffs and pigments containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-040216-Hazardous-DyestuffsAndPigmentsContainingHazardousSubstancesMember',
					},
					{
						code: '04 02 17',
						description:
							'Dyestuffs and pigments other than those mentioned in 04 02 16',
						type: 'Non-Hazardous',
						axis: 'waste:W-040217-Non-Hazardous-DyestuffsAndPigmentsOtherThanThoseMentionedIn040216Member',
					},
					{
						code: '04 02 19',
						description:
							'Sludges from on-site effluent treatment containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-040219-Hazardous-SludgesFromOn-SiteEffluentTreatmentContainingHazardousSubstancesMember',
					},
					{
						code: '04 02 20',
						description:
							'Sludges from on-site effluent treatment other than those mentioned in 04 02 19',
						type: 'Non-Hazardous',
						axis: 'waste:W-040220-Non-Hazardous-SludgesFromOn-SiteEffluentTreatmentOtherThanThoseMentionedIn040219Member',
					},
					{
						code: '04 02 21',
						description: 'Wastes from unprocessed textile fibres',
						type: 'Non-Hazardous',
						axis: 'waste:W-040221-Non-Hazardous-WastesFromUnprocessedTextileFibresMember',
					},
					{
						code: '04 02 22',
						description: 'Wastes from processed textile fibres',
						type: 'Non-Hazardous',
						axis: 'waste:W-040222-Non-Hazardous-WastesFromProcessedTextileFibresMember',
					},
					{
						code: '04 02 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-040299-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
		],
	},
	{
		id: 5,
		label:
			'WASTES FROM PETROLEUM REFINING, NATURAL GAS PURIFICATION AND PYROLYTIC TREATMENT OF COAL',
		subcategories: [
			{
				label: 'Wastes from petroleum refining',
				codes: [
					{
						code: '05 01 02',
						description: 'Desalter sludges',
						type: 'Hazardous',
						axis: 'waste:W-050102-Hazardous-DesalterSludgesMember',
					},
					{
						code: '05 01 03',
						description: 'Tank bottom sludges',
						type: 'Hazardous',
						axis: 'waste:W-050103-Hazardous-TankBottomSludgesMember',
					},
					{
						code: '05 01 04',
						description: 'Acid alkyl sludges',
						type: 'Hazardous',
						axis: 'waste:W-050104-Hazardous-AcidAlkylSludgesMember',
					},
					{
						code: '05 01 05',
						description: 'Oil spills',
						type: 'Hazardous',
						axis: 'waste:W-050105-Hazardous-OilSpillsMember',
					},
					{
						code: '05 01 06',
						description:
							'Oily sludges from maintenance operations of the plant or equipment',
						type: 'Hazardous',
						axis: 'waste:W-050106-Hazardous-OilySludgesFromMaintenanceOperationsOfThePlantOrEquipmentMember',
					},
					{
						code: '05 01 07',
						description: 'Acid tars',
						type: 'Hazardous',
						axis: 'waste:W-050107-Hazardous-AcidTarsMember',
					},
					{
						code: '05 01 08',
						description: 'Other tars',
						type: 'Hazardous',
						axis: 'waste:W-050108-Hazardous-OtherTarsMember',
					},
					{
						code: '05 01 09',
						description:
							'Sludges from on-site effluent treatment containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-050109-Hazardous-SludgesFromOn-SiteEffluentTreatmentContainingHazardousSubstancesMember',
					},
					{
						code: '05 01 10',
						description:
							'Sludges from on-site effluent treatment other than those mentioned in 05 01 09',
						type: 'Non-Hazardous',
						axis: 'waste:W-050110-Non-Hazardous-SludgesFromOn-SiteEffluentTreatmentOtherThanThoseMentionedIn050109Member',
					},
					{
						code: '05 01 11',
						description: 'Wastes from cleaning of fuels with bases',
						type: 'Hazardous',
						axis: 'waste:W-050111-Hazardous-WastesFromCleaningOfFuelsWithBasesMember',
					},
					{
						code: '05 01 12',
						description: 'Oil containing acids',
						type: 'Hazardous',
						axis: 'waste:W-050112-Hazardous-OilContainingAcidsMember',
					},
					{
						code: '05 01 13',
						description: 'Boiler feedwater sludges',
						type: 'Non-Hazardous',
						axis: 'waste:W-050113-Non-Hazardous-BoilerFeedwaterSludgesMember',
					},
					{
						code: '05 01 14',
						description: 'Wastes from cooling columns',
						type: 'Non-Hazardous',
						axis: 'waste:W-050114-Non-Hazardous-WastesFromCoolingColumnsMember',
					},
					{
						code: '05 01 15',
						description: 'Spent filter clays',
						type: 'Hazardous',
						axis: 'waste:W-050115-Hazardous-SpentFilterClaysMember',
					},
					{
						code: '05 01 16',
						description:
							'Sulphur-containing wastes from petroleum desulphurisation',
						type: 'Non-Hazardous',
						axis: 'waste:W-050116-Non-Hazardous-Sulphur-ContainingWastesFromPetroleumDesulphurisationMember',
					},
					{
						code: '05 01 17',
						description: 'Bitumen',
						type: 'Non-Hazardous',
						axis: 'waste:W-050117-Non-Hazardous-BitumenMember',
					},
					{
						code: '05 01 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-050199-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Wastes from the pyrolytic treatment of coal',
				codes: [
					{
						code: '05 06 01',
						description: 'Acid tars',
						type: 'Hazardous',
						axis: 'waste:W-050601-Hazardous-AcidTarsMember',
					},
					{
						code: '05 06 03',
						description: 'Other tars',
						type: 'Hazardous',
						axis: 'waste:W-050603-Hazardous-OtherTarsMember',
					},
					{
						code: '05 06 04',
						description: 'Waste from cooling columns',
						type: 'Non-Hazardous',
						axis: 'waste:W-050604-Non-Hazardous-WasteFromCoolingColumnsMember',
					},
					{
						code: '05 06 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-050699-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Wastes from natural gas purification and transportation',
				codes: [
					{
						code: '05 07 01',
						description: 'Wastes containing mercury',
						type: 'Hazardous',
						axis: 'waste:W-050701-Hazardous-WastesContainingMercuryMember',
					},
					{
						code: '05 07 02',
						description: 'Wastes containing sulphur',
						type: 'Non-Hazardous',
						axis: 'waste:W-050702-Non-Hazardous-WastesContainingSulphurMember',
					},
					{
						code: '05 07 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-050799-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
		],
	},
	{
		id: 6,
		label: 'WASTES FROM INORGANIC CHEMICAL PROCESSES',
		subcategories: [
			{
				label:
					'Wastes from the manufacture, formulation, supply and use (MFSU) of acids',
				codes: [
					{
						code: '06 01 01',
						description: 'Sulphuric acid and sulphurous acid',
						type: 'Hazardous',
						axis: 'waste:W-060101-Hazardous-SulphuricAcidAndSulphurousAcidMember',
					},
					{
						code: '06 01 02',
						description: 'Hydrochloric acid',
						type: 'Hazardous',
						axis: 'waste:W-060102-Hazardous-HydrochloricAcidMember',
					},
					{
						code: '06 01 03',
						description: 'Hydrofluoric acid',
						type: 'Hazardous',
						axis: 'waste:W-060103-Hazardous-HydrofluoricAcidMember',
					},
					{
						code: '06 01 04',
						description: 'Phosphoric and phosphorous acid',
						type: 'Hazardous',
						axis: 'waste:W-060104-Hazardous-PhosphoricAndPhosphorousAcidMember',
					},
					{
						code: '06 01 05',
						description: 'Nitric acid and nitrous acid',
						type: 'Hazardous',
						axis: 'waste:W-060105-Hazardous-NitricAcidAndNitrousAcidMember',
					},
					{
						code: '06 01 06',
						description: 'Other acids',
						type: 'Hazardous',
						axis: 'waste:W-060106-Hazardous-OtherAcidsMember',
					},
					{
						code: '06 01 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-060199-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Wastes from the MFSU of bases',
				codes: [
					{
						code: '06 02 01',
						description: 'Calcium hydroxide',
						type: 'Hazardous',
						axis: 'waste:W-060201-Hazardous-CalciumHydroxideMember',
					},
					{
						code: '06 02 03',
						description: 'Ammonium hydroxide',
						type: 'Hazardous',
						axis: 'waste:W-060203-Hazardous-AmmoniumHydroxideMember',
					},
					{
						code: '06 02 04',
						description: 'Sodium and potassium hydroxide',
						type: 'Hazardous',
						axis: 'waste:W-060204-Hazardous-SodiumAndPotassiumHydroxideMember',
					},
					{
						code: '06 02 05',
						description: 'Other bases',
						type: 'Hazardous',
						axis: 'waste:W-060205-Hazardous-OtherBasesMember',
					},
					{
						code: '06 02 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-060299-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label:
					'Wastes from the MFSU of salts and their solutions and metallic oxides',
				codes: [
					{
						code: '06 03 11',
						description: 'Solid salts and solutions containing cyanides',
						type: 'Hazardous',
						axis: 'waste:W-060311-Hazardous-SolidSaltsAndSolutionsContainingCyanidesMember',
					},
					{
						code: '06 03 13',
						description: 'Solid salts and solutions containing heavy metals',
						type: 'Hazardous',
						axis: 'waste:W-060313-Hazardous-SolidSaltsAndSolutionsContainingHeavyMetalsMember',
					},
					{
						code: '06 03 14',
						description:
							'Solid salts and solutions other than those mentioned in 06 03 11 and 06 03 13',
						type: 'Non-Hazardous',
						axis: 'waste:W-060314-Non-Hazardous-SolidSaltsAndSolutionsOtherThanThoseMentionedIn060311And060313Member',
					},
					{
						code: '06 03 15',
						description: 'Metallic oxides containing heavy metals',
						type: 'Hazardous',
						axis: 'waste:W-060315-Hazardous-MetallicOxidesContainingHeavyMetalsMember',
					},
					{
						code: '06 03 16',
						description:
							'Metallic oxides other than those mentioned in 06 03 15',
						type: 'Non-Hazardous',
						axis: 'waste:W-060316-Non-Hazardous-MetallicOxidesOtherThanThoseMentionedIn060315Member',
					},
					{
						code: '06 03 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-060399-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Metal-containing wastes other than those mentioned in 06 03',
				codes: [
					{
						code: '06 04 03',
						description: 'Wastes containing arsenic',
						type: 'Hazardous',
						axis: 'waste:W-060403-Hazardous-WastesContainingArsenicMember',
					},
					{
						code: '06 04 04',
						description: 'Wastes containing mercury',
						type: 'Hazardous',
						axis: 'waste:W-060404-Hazardous-WastesContainingMercuryMember',
					},
					{
						code: '06 04 05',
						description: 'Wastes containing other heavy metals',
						type: 'Hazardous',
						axis: 'waste:W-060405-Hazardous-WastesContainingOtherHeavyMetalsMember',
					},
					{
						code: '06 04 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-060499-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Sludges from on-site effluent treatment',
				codes: [
					{
						code: '06 05 02',
						description:
							'Sludges from on-site effluent treatment containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-060502-Hazardous-SludgesFromOn-SiteEffluentTreatmentContainingHazardousSubstancesMember',
					},
					{
						code: '06 05 03',
						description:
							'Sludges from on-site effluent treatment other than those mentioned in 06 05 02',
						type: 'Non-Hazardous',
						axis: 'waste:W-060503-Non-Hazardous-SludgesFromOn-SiteEffluentTreatmentOtherThanThoseMentionedIn060502Member',
					},
				],
			},
			{
				label:
					'Wastes from the MFSU of sulphur chemicals sulphur chemical processes and desulphurisation processes',
				codes: [
					{
						code: '06 06 02',
						description: 'Wastes containing hazardous sulphides',
						type: 'Hazardous',
						axis: 'waste:W-060602-Hazardous-WastesContainingHazardousSulphidesMember',
					},
					{
						code: '06 06 03',
						description:
							'Wastes containing sulphides other than those mentioned in 06 06 02',
						type: 'Non-Hazardous',
						axis: 'waste:W-060603-Non-Hazardous-WastesContainingSulphidesOtherThanThoseMentionedIn060602Member',
					},
					{
						code: '06 06 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-060699-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label:
					'Wastes from the MFSU of halogens and halogen chemical processes',
				codes: [
					{
						code: '06 07 01',
						description: 'Wastes containing asbestos from electrolysis',
						type: 'Hazardous',
						axis: 'waste:W-060701-Hazardous-WastesContainingAsbestosFromElectrolysisMember',
					},
					{
						code: '06 07 02',
						description: 'Activated carbon from chlorine production',
						type: 'Hazardous',
						axis: 'waste:W-060702-Hazardous-ActivatedCarbonFromChlorineProductionMember',
					},
					{
						code: '06 07 03',
						description: 'Barium sulphate sludge containing mercury',
						type: 'Hazardous',
						axis: 'waste:W-060703-Hazardous-BariumSulphateSludgeContainingMercuryMember',
					},
					{
						code: '06 07 04',
						description: 'Solutions and acids for example contact acid',
						type: 'Hazardous',
						axis: 'waste:W-060704-Hazardous-SolutionsAndAcidsForExampleContactAcidMember',
					},
					{
						code: '06 07 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-060799-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Wastes from the MFSU of silicon and silicon derivatives',
				codes: [
					{
						code: '06 08 02',
						description: 'Waste containing hazardous chlorosilanes',
						type: 'Hazardous',
						axis: 'waste:W-060802-Hazardous-WasteContainingHazardousChlorosilanesMember',
					},
					{
						code: '06 08 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-060899-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label:
					'Wastes from the MFSU of phosphorous chemicals and phosphorous chemical processes',
				codes: [
					{
						code: '06 09 02',
						description: 'Phosphorous slag',
						type: 'Non-Hazardous',
						axis: 'waste:W-060902-Non-Hazardous-PhosphorousSlagMember',
					},
					{
						code: '06 09 03',
						description:
							'Calcium-based reaction wastes containing or contaminated with hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-060903-Hazardous-Calcium-BasedReactionWastesContainingOrContaminatedWithHazardousSubstancesMember',
					},
					{
						code: '06 09 04',
						description:
							'Calcium-based reaction wastes other than those mentioned in 06 09 03',
						type: 'Non-Hazardous',
						axis: 'waste:W-060904-Non-Hazardous-Calcium-BasedReactionWastesOtherThanThoseMentionedIn060903Member',
					},
					{
						code: '06 09 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-060999-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label:
					'Wastes from the MFSU of nitrogen chemicals nitrogen chemical processes and fertiliser manufacture',
				codes: [
					{
						code: '06 10 02',
						description: 'Wastes containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-061002-Hazardous-WastesContainingHazardousSubstancesMember',
					},
					{
						code: '06 10 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-061099-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label:
					'Wastes from the manufacture of inorganic pigments and opacificiers',
				codes: [
					{
						code: '06 11 01',
						description:
							'Calcium-based reaction wastes from titanium dioxide production',
						type: 'Non-Hazardous',
						axis: 'waste:W-061101-Non-Hazardous-Calcium-BasedReactionWastesFromTitaniumDioxideProductionMember',
					},
					{
						code: '06 11 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-061199-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label:
					'Wastes from inorganic chemical processes not otherwise specified',
				codes: [
					{
						code: '06 13 01',
						description:
							'Inorganic plant protection products wood-preserving agents and other biocides',
						type: 'Hazardous',
						axis: 'waste:W-061301-Hazardous-InorganicPlantProtectionProductsWood-PreservingAgentsAndOtherBiocides.Member',
					},
					{
						code: '06 13 02',
						description: 'Spent activated carbon except 06 07 02',
						type: 'Hazardous',
						axis: 'waste:W-061302-Hazardous-SpentActivatedCarbonExcept060702Member',
					},
					{
						code: '06 13 03',
						description: 'Carbon black',
						type: 'Non-Hazardous',
						axis: 'waste:W-061303-Non-Hazardous-CarbonBlackMember',
					},
					{
						code: '06 13 04',
						description: 'Wastes from asbestos processing',
						type: 'Hazardous',
						axis: 'waste:W-061304-Hazardous-WastesFromAsbestosProcessingMember',
					},
					{
						code: '06 13 05',
						description: 'Soot',
						type: 'Hazardous',
						axis: 'waste:W-061305-Hazardous-SootMember',
					},
					{
						code: '06 13 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-061399-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
		],
	},
	{
		id: 7,
		label: 'WASTES FROM ORGANIC CHEMICAL PROCESSES',
		subcategories: [
			{
				label:
					'Wastes from the manufacture formulation supply and use MFSU of basic organic chemicals',
				codes: [
					{
						code: '07 01 01',
						description: 'Aqueous washing liquids and mother liquors',
						type: 'Hazardous',
						axis: 'waste:W-070101-Hazardous-AqueousWashingLiquidsAndMotherLiquorsMember',
					},
					{
						code: '07 01 03',
						description:
							'Organic halogenated solvents washing liquids and mother liquors',
						type: 'Hazardous',
						axis: 'waste:W-070103-Hazardous-OrganicHalogenatedSolventsWashingLiquidsAndMotherLiquorsMember',
					},
					{
						code: '07 01 04',
						description:
							'Other organic solvents washing liquids and mother liquors',
						type: 'Hazardous',
						axis: 'waste:W-070104-Hazardous-OtherOrganicSolventsWashingLiquidsAndMotherLiquorsMember',
					},
					{
						code: '07 01 07',
						description: 'Halogenated still bottoms and reaction residues',
						type: 'Hazardous',
						axis: 'waste:W-070107-Hazardous-HalogenatedStillBottomsAndReactionResiduesMember',
					},
					{
						code: '07 01 08',
						description: 'Other still bottoms and reaction residues',
						type: 'Hazardous',
						axis: 'waste:W-070108-Hazardous-OtherStillBottomsAndReactionResiduesMember',
					},
					{
						code: '07 01 09',
						description: 'Halogenated filter cakes and spent absorbents',
						type: 'Hazardous',
						axis: 'waste:W-070109-Hazardous-HalogenatedFilterCakesAndSpentAbsorbentsMember',
					},
					{
						code: '07 01 10',
						description: 'Other filter cakes and spent absorbents',
						type: 'Hazardous',
						axis: 'waste:W-070110-Hazardous-OtherFilterCakesAndSpentAbsorbentsMember',
					},
					{
						code: '07 01 11',
						description:
							'Sludges from on-site effluent treatment containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-070111-Hazardous-SludgesFromOn-SiteEffluentTreatmentContainingHazardousSubstancesMember',
					},
					{
						code: '07 01 12',
						description:
							'Sludges from on-site effluent treatment other than those mentioned in 07 01 11',
						type: 'Non-Hazardous',
						axis: 'waste:W-070112-Non-Hazardous-SludgesFromOn-SiteEffluentTreatmentOtherThanThoseMentionedIn070111Member',
					},
					{
						code: '07 01 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-070199-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label:
					'Wastes from the MFSU of plastics synthetic rubber and man-made fibres',
				codes: [
					{
						code: '07 02 01',
						description: 'Aqueous washing liquids and mother liquors',
						type: 'Hazardous',
						axis: 'waste:W-070201-Hazardous-AqueousWashingLiquidsAndMotherLiquorsMember',
					},
					{
						code: '07 02 03',
						description:
							'Organic halogenated solvents washing liquids and mother liquors',
						type: 'Hazardous',
						axis: 'waste:W-070203-Hazardous-OrganicHalogenatedSolventsWashingLiquidsAndMotherLiquorsMember',
					},
					{
						code: '07 02 04',
						description:
							'Other organic solvents washing liquids and mother liquors',
						type: 'Hazardous',
						axis: 'waste:W-070204-Hazardous-OtherOrganicSolventsWashingLiquidsAndMotherLiquorsMember',
					},
					{
						code: '07 02 07',
						description: 'Halogenated still bottoms and reaction residues',
						type: 'Hazardous',
						axis: 'waste:W-070207-Hazardous-HalogenatedStillBottomsAndReactionResiduesMember',
					},
					{
						code: '07 02 08',
						description: 'Other still bottoms and reaction residues',
						type: 'Hazardous',
						axis: 'waste:W-070208-Hazardous-OtherStillBottomsAndReactionResiduesMember',
					},
					{
						code: '07 02 09',
						description: 'Halogenated filter cakes and spent absorbents',
						type: 'Hazardous',
						axis: 'waste:W-070209-Hazardous-HalogenatedFilterCakesAndSpentAbsorbentsMember',
					},
					{
						code: '07 02 10',
						description: 'Other filter cakes and spent absorbents',
						type: 'Hazardous',
						axis: 'waste:W-070210-Hazardous-OtherFilterCakesAndSpentAbsorbentsMember',
					},
					{
						code: '07 02 11',
						description:
							'Sludges from on-site effluent treatment containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-070211-Hazardous-SludgesFromOn-SiteEffluentTreatmentContainingHazardousSubstancesMember',
					},
					{
						code: '07 02 12',
						description:
							'Sludges from on-site effluent treatment other than those mentioned in 07 02 11',
						type: 'Non-Hazardous',
						axis: 'waste:W-070212-Non-Hazardous-SludgesFromOn-SiteEffluentTreatmentOtherThanThoseMentionedIn070211Member',
					},
					{
						code: '07 02 13',
						description: 'Waste plastic',
						type: 'Non-Hazardous',
						axis: 'waste:W-070213-Non-Hazardous-WastePlasticMember',
					},
					{
						code: '07 02 14',
						description:
							'Wastes from additives containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-070214-Hazardous-WastesFromAdditivesContainingHazardousSubstancesMember',
					},
					{
						code: '07 02 15',
						description:
							'Wastes from additives other than those mentioned in 07 02 14',
						type: 'Non-Hazardous',
						axis: 'waste:W-070215-Non-Hazardous-WastesFromAdditivesOtherThanThoseMentionedIn070214Member',
					},
					{
						code: '07 02 16',
						description: 'Waste containing hazardous silicones',
						type: 'Hazardous',
						axis: 'waste:W-070216-Hazardous-WasteContainingHazardousSiliconesMember',
					},
					{
						code: '07 02 17',
						description:
							'Waste containing silicones other than those mentioned in 07 02 16',
						type: 'Non-Hazardous',
						axis: 'waste:W-070217-Non-Hazardous-WasteContainingSiliconesOtherThanThoseMentionedIn070216Member',
					},
					{
						code: '07 02 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-070299-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Wastes from the MFSU of organic dyes and pigments except 06 11',
				codes: [
					{
						code: '07 03 01',
						description: 'Aqueous washing liquids and mother liquors',
						type: 'Hazardous',
						axis: 'waste:W-070301-Hazardous-AqueousWashingLiquidsAndMotherLiquorsMember',
					},
					{
						code: '07 03 03',
						description:
							'Organic halogenated solvents washing liquids and mother liquors',
						type: 'Hazardous',
						axis: 'waste:W-070303-Hazardous-OrganicHalogenatedSolventsWashingLiquidsAndMotherLiquorsMember',
					},
					{
						code: '07 03 04',
						description:
							'Other organic solvents washing liquids and mother liquors',
						type: 'Hazardous',
						axis: 'waste:W-070304-Hazardous-OtherOrganicSolventsWashingLiquidsAndMotherLiquorsMember',
					},
					{
						code: '07 03 07',
						description: 'Halogenated still bottoms and reaction residues',
						type: 'Hazardous',
						axis: 'waste:W-070307-Hazardous-HalogenatedStillBottomsAndReactionResiduesMember',
					},
					{
						code: '07 03 08',
						description: 'Other still bottoms and reaction residues',
						type: 'Hazardous',
						axis: 'waste:W-070308-Hazardous-OtherStillBottomsAndReactionResiduesMember',
					},
					{
						code: '07 03 09',
						description: 'Halogenated filter cakes and spent absorbents',
						type: 'Hazardous',
						axis: 'waste:W-070309-Hazardous-HalogenatedFilterCakesAndSpentAbsorbentsMember',
					},
					{
						code: '07 03 10',
						description: 'Other filter cakes and spent absorbents',
						type: 'Hazardous',
						axis: 'waste:W-070310-Hazardous-OtherFilterCakesAndSpentAbsorbentsMember',
					},
					{
						code: '07 03 11',
						description:
							'Sludges from on-site effluent treatment containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-070311-Hazardous-SludgesFromOn-SiteEffluentTreatmentContainingHazardousSubstancesMember',
					},
					{
						code: '07 03 12',
						description:
							'Sludges from on-site effluent treatment other than those mentioned in 07 03 11',
						type: 'Non-Hazardous',
						axis: 'waste:W-070312-Non-Hazardous-SludgesFromOn-SiteEffluentTreatmentOtherThanThoseMentionedIn070311Member',
					},
					{
						code: '07 03 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-070399-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label:
					'Wastes from the MFSU of organic plant protection products except 02 01 08 and 02 01 09 wood preserving agents except 03 02 and other biocides',
				codes: [
					{
						code: '07 04 01',
						description: 'Aqueous washing liquids and mother liquors',
						type: 'Hazardous',
						axis: 'waste:W-070401-Hazardous-AqueousWashingLiquidsAndMotherLiquorsMember',
					},
					{
						code: '07 04 03',
						description:
							'Organic halogenated solvents washing liquids and mother liquors',
						type: 'Hazardous',
						axis: 'waste:W-070403-Hazardous-OrganicHalogenatedSolventsWashingLiquidsAndMotherLiquorsMember',
					},
					{
						code: '07 04 04',
						description:
							'Other organic solvents washing liquids and mother liquors',
						type: 'Hazardous',
						axis: 'waste:W-070404-Hazardous-OtherOrganicSolventsWashingLiquidsAndMotherLiquorsMember',
					},
					{
						code: '07 04 07',
						description: 'Halogenated still bottoms and reaction residues',
						type: 'Hazardous',
						axis: 'waste:W-070407-Hazardous-HalogenatedStillBottomsAndReactionResiduesMember',
					},
					{
						code: '07 04 08',
						description: 'Other still bottoms and reaction residues',
						type: 'Hazardous',
						axis: 'waste:W-070408-Hazardous-OtherStillBottomsAndReactionResiduesMember',
					},
					{
						code: '07 04 09',
						description: 'Halogenated filter cakes and spent absorbents',
						type: 'Hazardous',
						axis: 'waste:W-070409-Hazardous-HalogenatedFilterCakesAndSpentAbsorbentsMember',
					},
					{
						code: '07 04 10',
						description: 'Other filter cakes and spent absorbents',
						type: 'Hazardous',
						axis: 'waste:W-070410-Hazardous-OtherFilterCakesAndSpentAbsorbentsMember',
					},
					{
						code: '07 04 11',
						description:
							'Sludges from on-site effluent treatment containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-070411-Hazardous-SludgesFromOn-SiteEffluentTreatmentContainingHazardousSubstancesMember',
					},
					{
						code: '07 04 12',
						description:
							'Sludges from on-site effluent treatment other than those mentioned in 07 04 11',
						type: 'Non-Hazardous',
						axis: 'waste:W-070412-Non-Hazardous-SludgesFromOn-SiteEffluentTreatmentOtherThanThoseMentionedIn070411Member',
					},
					{
						code: '07 04 13',
						description: 'Solid wastes containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-070413-Hazardous-SolidWastesContainingHazardousSubstancesMember',
					},
					{
						code: '07 04 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-070499-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Wastes from the MFSU of pharmaceuticals',
				codes: [
					{
						code: '07 05 01',
						description: 'Aqueous washing liquids and mother liquors',
						type: 'Hazardous',
						axis: 'waste:W-070501-Hazardous-AqueousWashingLiquidsAndMotherLiquorsMember',
					},
					{
						code: '07 05 03',
						description:
							'Organic halogenated solvents washing liquids and mother liquors',
						type: 'Hazardous',
						axis: 'waste:W-070503-Hazardous-OrganicHalogenatedSolventsWashingLiquidsAndMotherLiquorsMember',
					},
					{
						code: '07 05 04',
						description:
							'Other organic solvents washing liquids and mother liquors',
						type: 'Hazardous',
						axis: 'waste:W-070504-Hazardous-OtherOrganicSolventsWashingLiquidsAndMotherLiquorsMember',
					},
					{
						code: '07 05 07',
						description: 'Halogenated still bottoms and reaction residues',
						type: 'Hazardous',
						axis: 'waste:W-070507-Hazardous-HalogenatedStillBottomsAndReactionResiduesMember',
					},
					{
						code: '07 05 08',
						description: 'Other still bottoms and reaction residues',
						type: 'Hazardous',
						axis: 'waste:W-070508-Hazardous-OtherStillBottomsAndReactionResiduesMember',
					},
					{
						code: '07 05 09',
						description: 'Halogenated filter cakes and spent absorbents',
						type: 'Hazardous',
						axis: 'waste:W-070509-Hazardous-HalogenatedFilterCakesAndSpentAbsorbentsMember',
					},
					{
						code: '07 05 10',
						description: 'Other filter cakes and spent absorbents',
						type: 'Hazardous',
						axis: 'waste:W-070510-Hazardous-OtherFilterCakesAndSpentAbsorbentsMember',
					},
					{
						code: '07 05 11',
						description:
							'Sludges from on-site effluent treatment containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-070511-Hazardous-SludgesFromOn-SiteEffluentTreatmentContainingHazardousSubstancesMember',
					},
					{
						code: '07 05 12',
						description:
							'Sludges from on-site effluent treatment other than those mentioned in 07 05 11',
						type: 'Non-Hazardous',
						axis: 'waste:W-070512-Non-Hazardous-SludgesFromOn-SiteEffluentTreatmentOtherThanThoseMentionedIn070511Member',
					},
					{
						code: '07 05 13',
						description: 'Solid wastes containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-070513-Hazardous-SolidWastesContainingHazardousSubstancesMember',
					},
					{
						code: '07 05 14',
						description: 'Solid wastes other than those mentioned in 07 05 13',
						type: 'Non-Hazardous',
						axis: 'waste:W-070514-Non-Hazardous-SolidWastesOtherThanThoseMentionedIn070513Member',
					},
					{
						code: '07 05 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-070599-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label:
					'Wastes from the MFSU of fats grease soaps detergents disinfectants and cosmetics',
				codes: [
					{
						code: '07 06 01',
						description: 'Aqueous washing liquids and mother liquors',
						type: 'Hazardous',
						axis: 'waste:W-070601-Hazardous-AqueousWashingLiquidsAndMotherLiquorsMember',
					},
					{
						code: '07 06 03',
						description:
							'Organic halogenated solvents washing liquids and mother liquors',
						type: 'Hazardous',
						axis: 'waste:W-070603-Hazardous-OrganicHalogenatedSolventsWashingLiquidsAndMotherLiquorsMember',
					},
					{
						code: '07 06 04',
						description:
							'Other organic solvents washing liquids and mother liquors',
						type: 'Hazardous',
						axis: 'waste:W-070604-Hazardous-OtherOrganicSolventsWashingLiquidsAndMotherLiquorsMember',
					},
					{
						code: '07 06 07',
						description: 'Halogenated still bottoms and reaction residues',
						type: 'Hazardous',
						axis: 'waste:W-070607-Hazardous-HalogenatedStillBottomsAndReactionResiduesMember',
					},
					{
						code: '07 06 08',
						description: 'Other still bottoms and reaction residues',
						type: 'Hazardous',
						axis: 'waste:W-070608-Hazardous-OtherStillBottomsAndReactionResiduesMember',
					},
					{
						code: '07 06 09',
						description: 'Halogenated filter cakes and spent absorbents',
						type: 'Hazardous',
						axis: 'waste:W-070609-Hazardous-HalogenatedFilterCakesAndSpentAbsorbentsMember',
					},
					{
						code: '07 06 10',
						description: 'Other filter cakes and spent absorbents',
						type: 'Hazardous',
						axis: 'waste:W-070610-Hazardous-OtherFilterCakesAndSpentAbsorbentsMember',
					},
					{
						code: '07 06 11',
						description:
							'Sludges from on-site effluent treatment containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-070611-Hazardous-SludgesFromOn-SiteEffluentTreatmentContainingHazardousSubstancesMember',
					},
					{
						code: '07 06 12',
						description:
							'Sludges from on-site effluent treatment other than those mentioned in 07 06 11',
						type: 'Non-Hazardous',
						axis: 'waste:W-070612-Non-Hazardous-SludgesFromOn-SiteEffluentTreatmentOtherThanThoseMentionedIn070611Member',
					},
					{
						code: '07 06 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-070699-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label:
					'Wastes from the MFSU of fine chemicals and chemical products not otherwise specified',
				codes: [
					{
						code: '07 07 01',
						description: 'Aqueous washing liquids and mother liquors',
						type: 'Hazardous',
						axis: 'waste:W-070701-Hazardous-AqueousWashingLiquidsAndMotherLiquorsMember',
					},
					{
						code: '07 07 03',
						description:
							'Organic halogenated solvents washing liquids and mother liquors',
						type: 'Hazardous',
						axis: 'waste:W-070703-Hazardous-OrganicHalogenatedSolventsWashingLiquidsAndMotherLiquorsMember',
					},
					{
						code: '07 07 04',
						description:
							'Other organic solvents washing liquids and mother liquors',
						type: 'Hazardous',
						axis: 'waste:W-070704-Hazardous-OtherOrganicSolventsWashingLiquidsAndMotherLiquorsMember',
					},
					{
						code: '07 07 07',
						description: 'Halogenated still bottoms and reaction residues',
						type: 'Hazardous',
						axis: 'waste:W-070707-Hazardous-HalogenatedStillBottomsAndReactionResiduesMember',
					},
					{
						code: '07 07 08',
						description: 'Other still bottoms and reaction residues',
						type: 'Hazardous',
						axis: 'waste:W-070708-Hazardous-OtherStillBottomsAndReactionResiduesMember',
					},
					{
						code: '07 07 09',
						description: 'Halogenated filter cakes and spent absorbents',
						type: 'Hazardous',
						axis: 'waste:W-070709-Hazardous-HalogenatedFilterCakesAndSpentAbsorbentsMember',
					},
					{
						code: '07 07 10',
						description: 'Other filter cakes and spent absorbents',
						type: 'Hazardous',
						axis: 'waste:W-070710-Hazardous-OtherFilterCakesAndSpentAbsorbentsMember',
					},
					{
						code: '07 07 11',
						description:
							'Sludges from on-site effluent treatment containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-070711-Hazardous-SludgesFromOn-SiteEffluentTreatmentContainingHazardousSubstancesMember',
					},
					{
						code: '07 07 12',
						description:
							'Sludges from on-site effluent treatment other than those mentioned in 07 07 11',
						type: 'Non-Hazardous',
						axis: 'waste:W-070712-Non-Hazardous-SludgesFromOn-SiteEffluentTreatmentOtherThanThoseMentionedIn070711Member',
					},
					{
						code: '07 07 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-070799-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
		],
	},
	{
		id: 8,
		label:
			'WASTES FROM THE MANUFACTURE FORMULATION SUPPLY AND USE MFSU OF COATINGS PAINTS VARNISHES AND VITREOUS ENAMELS ADHESIVES SEALANTS AND PRINTING INKS',
		subcategories: [
			{
				label: 'Wastes from MFSU and removal of paint and varnish',
				codes: [
					{
						code: '08 01 11',
						description:
							'Waste paint and varnish containing organic solvents or other hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-080111-Hazardous-WastePaintAndVarnishContainingOrganicSolventsOrOtherHazardousSubstancesMember',
					},
					{
						code: '08 01 12',
						description:
							'Waste paint and varnish other than those mentioned in 08 01 11',
						type: 'Non-Hazardous',
						axis: 'waste:W-080112-Non-Hazardous-WastePaintAndVarnishOtherThanThoseMentionedIn080111Member',
					},
					{
						code: '08 01 13',
						description:
							'Sludges from paint or varnish containing organic solvents or other hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-080113-Hazardous-SludgesFromPaintOrVarnishContainingOrganicSolventsOrOtherHazardousSubstancesMember',
					},
					{
						code: '08 01 14',
						description:
							'Sludges from paint or varnish other than those mentioned in 08 01 13',
						type: 'Non-Hazardous',
						axis: 'waste:W-080114-Non-Hazardous-SludgesFromPaintOrVarnishOtherThanThoseMentionedIn080113Member',
					},
					{
						code: '08 01 15',
						description:
							'Aqueous sludges containing paint or varnish containing organic solvents or other hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-080115-Hazardous-AqueousSludgesContainingPaintOrVarnishContainingOrganicSolventsOrOtherHazardousSubstancesMember',
					},
					{
						code: '08 01 16',
						description:
							'Aqueous sludges containing paint or varnish other than those mentioned in 08 01 15',
						type: 'Non-Hazardous',
						axis: 'waste:W-080116-Non-Hazardous-AqueousSludgesContainingPaintOrVarnishOtherThanThoseMentionedIn080115Member',
					},
					{
						code: '08 01 17',
						description:
							'Wastes from paint or varnish removal containing organic solvents or other hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-080117-Hazardous-WastesFromPaintOrVarnishRemovalContainingOrganicSolventsOrOtherHazardousSubstancesMember',
					},
					{
						code: '08 01 18',
						description:
							'Wastes from paint or varnish removal other than those mentioned in 08 01 17',
						type: 'Non-Hazardous',
						axis: 'waste:W-080118-Non-Hazardous-WastesFromPaintOrVarnishRemovalOtherThanThoseMentionedIn080117Member',
					},
					{
						code: '08 01 19',
						description:
							'Aqueous suspensions containing paint or varnish containing organic solvents or other hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-080119-Hazardous-AqueousSuspensionsContainingPaintOrVarnishContainingOrganicSolventsOrOtherHazardousSubstancesMember',
					},
					{
						code: '08 01 20',
						description:
							'Aqueous suspensions containing paint or varnish other than those mentioned in 08 01 19',
						type: 'Non-Hazardous',
						axis: 'waste:W-080120-Non-Hazardous-AqueousSuspensionsContainingPaintOrVarnishOtherThanThoseMentionedIn080119Member',
					},
					{
						code: '08 01 21',
						description: 'Waste paint or varnish remover',
						type: 'Hazardous',
						axis: 'waste:W-080121-Hazardous-WastePaintOrVarnishRemoverMember',
					},
					{
						code: '08 01 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-080199-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Wastes from MFSU of other coatings including ceramic materials',
				codes: [
					{
						code: '08 02 01',
						description: 'Waste coating powders',
						type: 'Non-Hazardous',
						axis: 'waste:W-080201-Non-Hazardous-WasteCoatingPowdersMember',
					},
					{
						code: '08 02 02',
						description: 'Aqueous sludges containing ceramic materials',
						type: 'Non-Hazardous',
						axis: 'waste:W-080202-Non-Hazardous-AqueousSludgesContainingCeramicMaterialsMember',
					},
					{
						code: '08 02 03',
						description: 'Aqueous suspensions containing ceramic materials',
						type: 'Non-Hazardous',
						axis: 'waste:W-080203-Non-Hazardous-AqueousSuspensionsContainingCeramicMaterialsMember',
					},
					{
						code: '08 02 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-080299-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Wastes from MFSU of printing inks',
				codes: [
					{
						code: '08 03 07',
						description: 'Aqueous sludges containing ink',
						type: 'Non-Hazardous',
						axis: 'waste:W-080307-Non-Hazardous-AqueousSludgesContainingInkMember',
					},
					{
						code: '08 03 08',
						description: 'Aqueous liquid waste containing ink',
						type: 'Non-Hazardous',
						axis: 'waste:W-080308-Non-Hazardous-AqueousLiquidWasteContainingInkMember',
					},
					{
						code: '08 03 12',
						description: 'Waste ink containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-080312-Hazardous-WasteInkContainingHazardousSubstancesMember',
					},
					{
						code: '08 03 13',
						description: 'Waste ink other than those mentioned in 08 03 12',
						type: 'Non-Hazardous',
						axis: 'waste:W-080313-Non-Hazardous-WasteInkOtherThanThoseMentionedIn080312Member',
					},
					{
						code: '08 03 14',
						description: 'Ink sludges containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-080314-Hazardous-InkSludgesContainingHazardousSubstancesMember',
					},
					{
						code: '08 03 15',
						description: 'Ink sludges other than those mentioned in 08 03 14',
						type: 'Non-Hazardous',
						axis: 'waste:W-080315-Non-Hazardous-InkSludgesOtherThanThoseMentionedIn080314Member',
					},
					{
						code: '08 03 16',
						description: 'Waste etching solutions',
						type: 'Hazardous',
						axis: 'waste:W-080316-Hazardous-WasteEtchingSolutionsMember',
					},
					{
						code: '08 03 17',
						description: 'Waste printing toner containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-080317-Hazardous-WastePrintingTonerContainingHazardousSubstancesMember',
					},
					{
						code: '08 03 18',
						description:
							'Waste printing toner other than those mentioned in 08 03 17',
						type: 'Non-Hazardous',
						axis: 'waste:W-080318-Non-Hazardous-WastePrintingTonerOtherThanThoseMentionedIn080317Member',
					},
					{
						code: '08 03 19',
						description: 'Disperse oil',
						type: 'Hazardous',
						axis: 'waste:W-080319-Hazardous-DisperseOilMember',
					},
					{
						code: '08 03 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-080399-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label:
					'Wastes from MFSU of adhesives and sealants including waterproofing products',
				codes: [
					{
						code: '08 04 09',
						description:
							'Waste adhesives and sealants containing organic solvents or other hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-080409-Hazardous-WasteAdhesivesAndSealantsContainingOrganicSolventsOrOtherHazardousSubstancesMember',
					},
					{
						code: '08 04 10',
						description:
							'Waste adhesives and sealants other than those mentioned in 08 04 09',
						type: 'Non-Hazardous',
						axis: 'waste:W-080410-Non-Hazardous-WasteAdhesivesAndSealantsOtherThanThoseMentionedIn080409Member',
					},
					{
						code: '08 04 11',
						description:
							'Adhesive and sealant sludges containing organic solvents or other hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-080411-Hazardous-AdhesiveAndSealantSludgesContainingOrganicSolventsOrOtherHazardousSubstancesMember',
					},
					{
						code: '08 04 12',
						description:
							'Adhesive and sealant sludges other than those mentioned in 08 04 11',
						type: 'Non-Hazardous',
						axis: 'waste:W-080412-Non-Hazardous-AdhesiveAndSealantSludgesOtherThanThoseMentionedIn080411Member',
					},
					{
						code: '08 04 13',
						description:
							'Aqueous sludges containing adhesives or sealants containing organic solvents or other hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-080413-Hazardous-AqueousSludgesContainingAdhesivesOrSealantsContainingOrganicSolventsOrOtherHazardousSubstancesMember',
					},
					{
						code: '08 04 14',
						description:
							'Aqueous sludges containing adhesives or sealants other than those mentioned in 08 04 13',
						type: 'Non-Hazardous',
						axis: 'waste:W-080414-Non-Hazardous-AqueousSludgesContainingAdhesivesOrSealantsOtherThanThoseMentionedIn080413Member',
					},
					{
						code: '08 04 15',
						description:
							'Aqueous liquid waste containing adhesives or sealants containing organic solvents or other hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-080415-Hazardous-AqueousLiquidWasteContainingAdhesivesOrSealantsContainingOrganicSolventsOrOtherHazardousSubstancesMember',
					},
					{
						code: '08 04 16',
						description:
							'Aqueous liquid waste containing adhesives or sealants other than those mentioned in 08 04 15',
						type: 'Non-Hazardous',
						axis: 'waste:W-080416-Non-Hazardous-AqueousLiquidWasteContainingAdhesivesOrSealantsOtherThanThoseMentionedIn080415Member',
					},
					{
						code: '08 04 17',
						description: 'Rosin oil',
						type: 'Hazardous',
						axis: 'waste:W-080417-Hazardous-RosinOilMember',
					},
					{
						code: '08 04 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-080499-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Wastes not otherwise specified in 08',
				codes: [
					{
						code: '08 05 01',
						description: 'Waste isocyanates',
						type: 'Hazardous',
						axis: 'waste:W-080501-Hazardous-WasteIsocyanatesMember',
					},
				],
			},
		],
	},
	{
		id: 9,
		label: 'WASTES FROM THE PHOTOGRAPHIC INDUSTRY',
		subcategories: [
			{
				label: 'Wastes from the photographic industry',
				codes: [
					{
						code: '09 01 01',
						description: 'Water-based developer and activator solutions',
						type: 'Hazardous',
						axis: 'waste:W-090101-Hazardous-Water-BasedDeveloperAndActivatorSolutionsMember',
					},
					{
						code: '09 01 02',
						description: 'Water-based offset plate developer solutions',
						type: 'Hazardous',
						axis: 'waste:W-090102-Hazardous-Water-BasedOffsetPlateDeveloperSolutionsMember',
					},
					{
						code: '09 01 03',
						description: 'Solvent-based developer solutions',
						type: 'Hazardous',
						axis: 'waste:W-090103-Hazardous-Solvent-BasedDeveloperSolutionsMember',
					},
					{
						code: '09 01 04',
						description: 'Fixer solutions',
						type: 'Hazardous',
						axis: 'waste:W-090104-Hazardous-FixerSolutionsMember',
					},
					{
						code: '09 01 05',
						description: 'Bleach solutions and bleach fixer solutions',
						type: 'Hazardous',
						axis: 'waste:W-090105-Hazardous-BleachSolutionsAndBleachFixerSolutionsMember',
					},
					{
						code: '09 01 06',
						description:
							'Wastes containing silver from on-site treatment of photographic wastes',
						type: 'Hazardous',
						axis: 'waste:W-090106-Hazardous-WastesContainingSilverFromOn-SiteTreatmentOfPhotographicWastesMember',
					},
					{
						code: '09 01 07',
						description:
							'Photographic film and paper containing silver or silver compounds',
						type: 'Non-Hazardous',
						axis: 'waste:W-090107-Non-Hazardous-PhotographicFilmAndPaperContainingSilverOrSilverCompoundsMember',
					},
					{
						code: '09 01 08',
						description:
							'Photographic film and paper free of silver or silver compounds',
						type: 'Non-Hazardous',
						axis: 'waste:W-090108-Non-Hazardous-PhotographicFilmAndPaperFreeOfSilverOrSilverCompoundsMember',
					},
					{
						code: '09 01 10',
						description: 'Single-use cameras without batteries',
						type: 'Non-Hazardous',
						axis: 'waste:W-090110-Non-Hazardous-Single-UseCamerasWithoutBatteriesMember',
					},
					{
						code: '09 01 11',
						description:
							'Single-use cameras containing batteries included in 16 06 01 16 06 02 or 16 06 03',
						type: 'Hazardous',
						axis: 'waste:W-090111-Hazardous-Single-UseCamerasContainingBatteriesIncludedIn160601160602Or160603Member',
					},
					{
						code: '09 01 12',
						description:
							'Single-use cameras containing batteries other than those mentioned in 09 01 11',
						type: 'Non-Hazardous',
						axis: 'waste:W-090112-Non-Hazardous-Single-UseCamerasContainingBatteriesOtherThanThoseMentionedIn090111Member',
					},
					{
						code: '09 01 13',
						description:
							'Aqueous liquid waste from on-site reclamation of silver other than those mentioned in 09 01 06',
						type: 'Hazardous',
						axis: 'waste:W-090113-Hazardous-AqueousLiquidWasteFromOn-SiteReclamationOfSilverOtherThanThoseMentionedIn090106Member',
					},
					{
						code: '09 01 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-090199-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
		],
	},
	{
		id: 10,
		label: 'WASTES FROM THERMAL PROCESSES',
		subcategories: [
			{
				label:
					'Wastes from power stations and other combustion plants except 19',
				codes: [
					{
						code: '10 01 01',
						description:
							'Bottom ash, slag and boiler dust (excluding boiler dust mentioned in 10 01 04)',
						type: 'Non-Hazardous',
						axis: 'waste:W-100101-Non-Hazardous-BottomAshSlagAndBoilerDustExcludingBoilerDustMentionedIn100104Member',
					},
					{
						code: '10 01 02',
						description: 'Coal fly ash',
						type: 'Non-Hazardous',
						axis: 'waste:W-100102-Non-Hazardous-CoalFlyAshMember',
					},
					{
						code: '10 01 03',
						description: 'Fly ash from peat and untreated wood',
						type: 'Non-Hazardous',
						axis: 'waste:W-100103-Non-Hazardous-FlyAshFromPeatAndUntreatedWoodMember',
					},
					{
						code: '10 01 04',
						description: 'Oil fly ash and boiler dust',
						type: 'Hazardous',
						axis: 'waste:W-100104-Hazardous-OilFlyAshAndBoilerDustMember',
					},
					{
						code: '10 01 05',
						description:
							'Calcium-based reaction wastes from flue-gas desulphurisation in solid form',
						type: 'Non-Hazardous',
						axis: 'waste:W-100105-Non-Hazardous-Calcium-BasedReactionWastesFromFlue-GasDesulphurisationInSolidFormMember',
					},
					{
						code: '10 01 07',
						description:
							'Calcium-based reaction wastes from flue-gas desulphurisation in sludge form',
						type: 'Non-Hazardous',
						axis: 'waste:W-100107-Non-Hazardous-Calcium-BasedReactionWastesFromFlue-GasDesulphurisationInSludgeFormMember',
					},
					{
						code: '10 01 09',
						description: 'Sulphuric acid',
						type: 'Hazardous',
						axis: 'waste:W-100109-Hazardous-SulphuricAcidMember',
					},
					{
						code: '10 01 13',
						description: 'Fly ash from emulsified hydrocarbons used as fuel',
						type: 'Hazardous',
						axis: 'waste:W-100113-Hazardous-FlyAshFromEmulsifiedHydrocarbonsUsedAsFuelMember',
					},
					{
						code: '10 01 14',
						description:
							'Bottom ash slag and boiler dust from co-incineration containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-100114-Hazardous-BottomAshSlagAndBoilerDustFromCo-IncinerationContainingHazardousSubstancesMember',
					},
					{
						code: '10 01 15',
						description:
							'Bottom ash slag and boiler dust from co-incineration other than those mentioned in 10 01 14',
						type: 'Non-Hazardous',
						axis: 'waste:W-100115-Non-Hazardous-BottomAshSlagAndBoilerDustFromCo-IncinerationOtherThanThoseMentionedIn100114Member',
					},
					{
						code: '10 01 16',
						description:
							'Fly ash from co-incineration containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-100116-Hazardous-FlyAshFromCo-IncinerationContainingHazardousSubstancesMember',
					},
					{
						code: '10 01 17',
						description:
							'Fly ash from co-incineration other than those mentioned in 10 01 16',
						type: 'Non-Hazardous',
						axis: 'waste:W-100117-Non-Hazardous-FlyAshFromCo-IncinerationOtherThanThoseMentionedIn100116Member',
					},
					{
						code: '10 01 18',
						description:
							'Wastes from gas cleaning containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-100118-Hazardous-WastesFromGasCleaningContainingHazardousSubstancesMember',
					},
					{
						code: '10 01 19',
						description:
							'Wastes from gas cleaning other than those mentioned in 10 01 05 10 01 07 and 10 01 18',
						type: 'Non-Hazardous',
						axis: 'waste:W-100119-Non-Hazardous-WastesFromGasCleaningOtherThanThoseMentionedIn100105100107And100118Member',
					},
					{
						code: '10 01 20',
						description:
							'Sludges from on-site effluent treatment containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-100120-Hazardous-SludgesFromOn-SiteEffluentTreatmentContainingHazardousSubstancesMember',
					},
					{
						code: '10 01 21',
						description:
							'Sludges from on-site effluent treatment other than those mentioned in 10 01 20',
						type: 'Non-Hazardous',
						axis: 'waste:W-100121-Non-Hazardous-SludgesFromOn-SiteEffluentTreatmentOtherThanThoseMentionedIn100120Member',
					},
					{
						code: '10 01 22',
						description:
							'Aqueous sludges from boiler cleansing containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-100122-Hazardous-AqueousSludgesFromBoilerCleansingContainingHazardousSubstancesMember',
					},
					{
						code: '10 01 23',
						description:
							'Aqueous sludges from boiler cleansing other than those mentioned in 10 01 22',
						type: 'Non-Hazardous',
						axis: 'waste:W-100123-Non-Hazardous-AqueousSludgesFromBoilerCleansingOtherThanThoseMentionedIn100122Member',
					},
					{
						code: '10 01 24',
						description: 'Sands from fluidised beds',
						type: 'Non-Hazardous',
						axis: 'waste:W-100124-Non-Hazardous-SandsFromFluidisedBedsMember',
					},
					{
						code: '10 01 25',
						description:
							'Wastes from fuel storage and preparation of coal-fired power plants',
						type: 'Non-Hazardous',
						axis: 'waste:W-100125-Non-Hazardous-WastesFromFuelStorageAndPreparationOfCoal-FiredPowerPlantsMember',
					},
					{
						code: '10 01 26',
						description: 'Wastes from cooling-water treatment',
						type: 'Non-Hazardous',
						axis: 'waste:W-100126-Non-Hazardous-WastesFromCooling-WaterTreatmentMember',
					},
					{
						code: '10 01 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-100199-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Wastes from the iron and steel industry',
				codes: [
					{
						code: '10 02 01',
						description: 'Wastes from the processing of slag',
						type: 'Non-Hazardous',
						axis: 'waste:W-100201-Non-Hazardous-WastesFromTheProcessingOfSlagMember',
					},
					{
						code: '10 02 02',
						description: 'Unprocessed slag',
						type: 'Non-Hazardous',
						axis: 'waste:W-100202-Non-Hazardous-UnprocessedSlagMember',
					},
					{
						code: '10 02 07',
						description:
							'Solid wastes from gas treatment containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-100207-Hazardous-SolidWastesFromGasTreatmentContainingHazardousSubstancesMember',
					},
					{
						code: '10 02 08',
						description:
							'Solid wastes from gas treatment other than those mentioned in 10 02 07',
						type: 'Non-Hazardous',
						axis: 'waste:W-100208-Non-Hazardous-SolidWastesFromGasTreatmentOtherThanThoseMentionedIn100207Member',
					},
					{
						code: '10 02 10',
						description: 'Mill scales',
						type: 'Non-Hazardous',
						axis: 'waste:W-100210-Non-Hazardous-MillScalesMember',
					},
					{
						code: '10 02 11',
						description: 'Wastes from cooling-water treatment containing oil',
						type: 'Hazardous',
						axis: 'waste:W-100211-Hazardous-WastesFromCooling-WaterTreatmentContainingOilMember',
					},
					{
						code: '10 02 12',
						description:
							'Wastes from cooling-water treatment other than those mentioned in 10 02 11',
						type: 'Non-Hazardous',
						axis: 'waste:W-100212-Non-Hazardous-WastesFromCooling-WaterTreatmentOtherThanThoseMentionedIn100211Member',
					},
					{
						code: '10 02 13',
						description:
							'Sludges and filter cakes from gas treatment containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-100213-Hazardous-SludgesAndFilterCakesFromGasTreatmentContainingHazardousSubstancesMember',
					},
					{
						code: '10 02 14',
						description:
							'Sludges and filter cakes from gas treatment other than those mentioned in 10 02 13',
						type: 'Non-Hazardous',
						axis: 'waste:W-100214-Non-Hazardous-SludgesAndFilterCakesFromGasTreatmentOtherThanThoseMentionedIn100213Member',
					},
					{
						code: '10 02 15',
						description: 'Other sludges and filter cakes',
						type: 'Non-Hazardous',
						axis: 'waste:W-100215-Non-Hazardous-OtherSludgesAndFilterCakesMember',
					},
					{
						code: '10 02 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-100299-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Wastes from aluminium thermal metallurgy',
				codes: [
					{
						code: '10 03 02',
						description: 'Anode scraps',
						type: 'Non-Hazardous',
						axis: 'waste:W-100302-Non-Hazardous-AnodeScrapsMember',
					},
					{
						code: '10 03 04',
						description: 'Primary production slags',
						type: 'Hazardous',
						axis: 'waste:W-100304-Hazardous-PrimaryProductionSlagsMember',
					},
					{
						code: '10 03 05',
						description: 'Waste alumina',
						type: 'Non-Hazardous',
						axis: 'waste:W-100305-Non-Hazardous-WasteAluminaMember',
					},
					{
						code: '10 03 08',
						description: 'Salt slags from secondary production',
						type: 'Hazardous',
						axis: 'waste:W-100308-Hazardous-SaltSlagsFromSecondaryProductionMember',
					},
					{
						code: '10 03 09',
						description: 'Black drosses from secondary production',
						type: 'Hazardous',
						axis: 'waste:W-100309-Hazardous-BlackDrossesFromSecondaryProductionMember',
					},
					{
						code: '10 03 15',
						description:
							'Skimmings that are flammable or emit upon contact with water flammable gases in hazardous quantities',
						type: 'Hazardous',
						axis: 'waste:W-100315-Hazardous-SkimmingsThatAreFlammableOrEmitUponContactWithWaterFlammableGasesInHazardousQuantitiesMember',
					},
					{
						code: '10 03 16',
						description: 'Skimmings other than those mentioned in 10 03 15',
						type: 'Non-Hazardous',
						axis: 'waste:W-100316-Non-Hazardous-SkimmingsOtherThanThoseMentionedIn100315Member',
					},
					{
						code: '10 03 17',
						description: 'Tar-containing wastes from anode manufacture',
						type: 'Hazardous',
						axis: 'waste:W-100317-Hazardous-Tar-ContainingWastesFromAnodeManufactureMember',
					},
					{
						code: '10 03 18',
						description:
							'Carbon-containing wastes from anode manufacture other than those mentioned in 10 03 17',
						type: 'Non-Hazardous',
						axis: 'waste:W-100318-Non-Hazardous-Carbon-ContainingWastesFromAnodeManufactureOtherThanThoseMentionedIn100317Member',
					},
					{
						code: '10 03 19',
						description: 'Flue-gas dust containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-100319-Hazardous-Flue-GasDustContainingHazardousSubstancesMember',
					},
					{
						code: '10 03 20',
						description: 'Flue-gas dust other than those mentioned in 10 03 19',
						type: 'Non-Hazardous',
						axis: 'waste:W-100320-Non-Hazardous-Flue-GasDustOtherThanThoseMentionedIn100319Member',
					},
					{
						code: '10 03 21',
						description:
							'Other particulates and dust including ball-mill dust containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-100321-Hazardous-OtherParticulatesAndDustIncludingBall-MillDustContainingHazardousSubstancesMember',
					},
					{
						code: '10 03 22',
						description:
							'Other particulates and dust including ball-mill dust other than those mentioned in 10 03 21',
						type: 'Non-Hazardous',
						axis: 'waste:W-100322-Non-Hazardous-OtherParticulatesAndDustIncludingBall-MillDustOtherThanThoseMentionedIn100321Member',
					},
					{
						code: '10 03 23',
						description:
							'Solid wastes from gas treatment containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-100323-Hazardous-SolidWastesFromGasTreatmentContainingHazardousSubstancesMember',
					},
					{
						code: '10 03 24',
						description:
							'Solid wastes from gas treatment other than those mentioned in 10 03 23',
						type: 'Non-Hazardous',
						axis: 'waste:W-100324-Non-Hazardous-SolidWastesFromGasTreatmentOtherThanThoseMentionedIn100323Member',
					},
					{
						code: '10 03 25',
						description:
							'Sludges and filter cakes from gas treatment containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-100325-Hazardous-SludgesAndFilterCakesFromGasTreatmentContainingHazardousSubstancesMember',
					},
					{
						code: '10 03 26',
						description:
							'Sludges and filter cakes from gas treatment other than those mentioned in 10 03 25',
						type: 'Non-Hazardous',
						axis: 'waste:W-100326-Non-Hazardous-SludgesAndFilterCakesFromGasTreatmentOtherThanThoseMentionedIn100325Member',
					},
					{
						code: '10 03 27',
						description: 'Wastes from cooling-water treatment containing oil',
						type: 'Hazardous',
						axis: 'waste:W-100327-Hazardous-WastesFromCooling-WaterTreatmentContainingOilMember',
					},
					{
						code: '10 03 28',
						description:
							'Wastes from cooling-water treatment other than those mentioned in 10 03 27',
						type: 'Non-Hazardous',
						axis: 'waste:W-100328-Non-Hazardous-WastesFromCooling-WaterTreatmentOtherThanThoseMentionedIn100327Member',
					},
					{
						code: '10 03 29',
						description:
							'Wastes from treatment of salt slags and black drosses containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-100329-Hazardous-WastesFromTreatmentOfSaltSlagsAndBlackDrossesContainingHazardousSubstancesMember',
					},
					{
						code: '10 03 30',
						description:
							'Wastes from treatment of salt slags and black drosses other than those mentioned in 10 03 29',
						type: 'Non-Hazardous',
						axis: 'waste:W-100330-Non-Hazardous-WastesFromTreatmentOfSaltSlagsAndBlackDrossesOtherThanThoseMentionedIn100329Member',
					},
					{
						code: '10 03 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-100399-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Wastes from lead thermal metallurgy',
				codes: [
					{
						code: '10 04 01',
						description: 'Slags from primary and secondary production',
						type: 'Hazardous',
						axis: 'waste:W-100401-Hazardous-SlagsFromPrimaryAndSecondaryProductionMember',
					},
					{
						code: '10 04 02',
						description:
							'Dross and skimmings from primary and secondary production',
						type: 'Hazardous',
						axis: 'waste:W-100402-Hazardous-DrossAndSkimmingsFromPrimaryAndSecondaryProductionMember',
					},
					{
						code: '10 04 03',
						description: 'Calcium arsenate',
						type: 'Hazardous',
						axis: 'waste:W-100403-Hazardous-CalciumArsenateMember',
					},
					{
						code: '10 04 04',
						description: 'Flue-gas dust',
						type: 'Hazardous',
						axis: 'waste:W-100404-Hazardous-Flue-GasDustMember',
					},
					{
						code: '10 04 05',
						description: 'Other particulates and dust',
						type: 'Hazardous',
						axis: 'waste:W-100405-Hazardous-OtherParticulatesAndDustMember',
					},
					{
						code: '10 04 06',
						description: 'Solid wastes from gas treatment',
						type: 'Hazardous',
						axis: 'waste:W-100406-Hazardous-SolidWastesFromGasTreatmentMember',
					},
					{
						code: '10 04 07',
						description: 'Sludges and filter cakes from gas treatment',
						type: 'Hazardous',
						axis: 'waste:W-100407-Hazardous-SludgesAndFilterCakesFromGasTreatmentMember',
					},
					{
						code: '10 04 09',
						description: 'Wastes from cooling-water treatment containing oil',
						type: 'Hazardous',
						axis: 'waste:W-100409-Hazardous-WastesFromCooling-WaterTreatmentContainingOilMember',
					},
					{
						code: '10 04 10',
						description:
							'Wastes from cooling-water treatment other than those mentioned in 10 04 09',
						type: 'Non-Hazardous',
						axis: 'waste:W-100410-Non-Hazardous-WastesFromCooling-WaterTreatmentOtherThanThoseMentionedIn100409Member',
					},
					{
						code: '10 04 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-100499-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Wastes from zinc thermal metallurgy',
				codes: [
					{
						code: '10 05 01',
						description: 'Slags from primary and secondary production',
						type: 'Non-Hazardous',
						axis: 'waste:W-100501-Non-Hazardous-SlagsFromPrimaryAndSecondaryProductionMember',
					},
					{
						code: '10 05 03',
						description: 'Flue-gas dust',
						type: 'Hazardous',
						axis: 'waste:W-100503-Hazardous-Flue-GasDustMember',
					},
					{
						code: '10 05 04',
						description: 'Other particulates and dust',
						type: 'Non-Hazardous',
						axis: 'waste:W-100504-Non-Hazardous-OtherParticulatesAndDustMember',
					},
					{
						code: '10 05 05',
						description: 'Solid waste from gas treatment',
						type: 'Hazardous',
						axis: 'waste:W-100505-Hazardous-SolidWasteFromGasTreatmentMember',
					},
					{
						code: '10 05 06',
						description: 'Sludges and filter cakes from gas treatment',
						type: 'Hazardous',
						axis: 'waste:W-100506-Hazardous-SludgesAndFilterCakesFromGasTreatmentMember',
					},
					{
						code: '10 05 08',
						description: 'Wastes from cooling-water treatment containing oil',
						type: 'Hazardous',
						axis: 'waste:W-100508-Hazardous-WastesFromCooling-WaterTreatmentContainingOilMember',
					},
					{
						code: '10 05 09',
						description:
							'Wastes from cooling-water treatment other than those mentioned in 10 05 08',
						type: 'Non-Hazardous',
						axis: 'waste:W-100509-Non-Hazardous-WastesFromCooling-WaterTreatmentOtherThanThoseMentionedIn100508Member',
					},
					{
						code: '10 05 10',
						description:
							'Dross and skimmings that are flammable or emit upon contact with water flammable gases in hazardous quantities',
						type: 'Hazardous',
						axis: 'waste:W-100510-Hazardous-DrossAndSkimmingsThatAreFlammableOrEmitUponContactWithWaterFlammableGasesInHazardousQuantitiesMember',
					},
					{
						code: '10 05 11',
						description:
							'Dross and skimmings other than those mentioned in 10 05 10',
						type: 'Non-Hazardous',
						axis: 'waste:W-100511-Non-Hazardous-DrossAndSkimmingsOtherThanThoseMentionedIn100510Member',
					},
					{
						code: '10 05 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-100599-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Wastes from copper thermal metallurgy',
				codes: [
					{
						code: '10 06 01',
						description: 'Slags from primary and secondary production',
						type: 'Non-Hazardous',
						axis: 'waste:W-100601-Non-Hazardous-SlagsFromPrimaryAndSecondaryProductionMember',
					},
					{
						code: '10 06 02',
						description:
							'Dross and skimmings from primary and secondary production',
						type: 'Non-Hazardous',
						axis: 'waste:W-100602-Non-Hazardous-DrossAndSkimmingsFromPrimaryAndSecondaryProductionMember',
					},
					{
						code: '10 06 03',
						description: 'Flue-gas dust',
						type: 'Hazardous',
						axis: 'waste:W-100603-Hazardous-Flue-GasDustMember',
					},
					{
						code: '10 06 04',
						description: 'Other particulates and dust',
						type: 'Non-Hazardous',
						axis: 'waste:W-100604-Non-Hazardous-OtherParticulatesAndDustMember',
					},
					{
						code: '10 06 06',
						description: 'Solid wastes from gas treatment',
						type: 'Hazardous',
						axis: 'waste:W-100606-Hazardous-SolidWastesFromGasTreatmentMember',
					},
					{
						code: '10 06 07',
						description: 'Sludges and filter cakes from gas treatment',
						type: 'Hazardous',
						axis: 'waste:W-100607-Hazardous-SludgesAndFilterCakesFromGasTreatmentMember',
					},
					{
						code: '10 06 09',
						description: 'Wastes from cooling-water treatment containing oil',
						type: 'Hazardous',
						axis: 'waste:W-100609-Hazardous-WastesFromCooling-WaterTreatmentContainingOilMember',
					},
					{
						code: '10 06 10',
						description:
							'Wastes from cooling-water treatment other than those mentioned in 10 06 09',
						type: 'Non-Hazardous',
						axis: 'waste:W-100610-Non-Hazardous-WastesFromCooling-WaterTreatmentOtherThanThoseMentionedIn100609Member',
					},
					{
						code: '10 06 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-100699-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Wastes from silver gold and platinum thermal metallurgy',
				codes: [
					{
						code: '10 07 01',
						description: 'Slags from primary and secondary production',
						type: 'Non-Hazardous',
						axis: 'waste:W-100701-Non-Hazardous-SlagsFromPrimaryAndSecondaryProductionMember',
					},
					{
						code: '10 07 02',
						description:
							'Dross and skimmings from primary and secondary production',
						type: 'Non-Hazardous',
						axis: 'waste:W-100702-Non-Hazardous-DrossAndSkimmingsFromPrimaryAndSecondaryProductionMember',
					},
					{
						code: '10 07 03',
						description: 'Solid wastes from gas treatment',
						type: 'Non-Hazardous',
						axis: 'waste:W-100703-Non-Hazardous-SolidWastesFromGasTreatmentMember',
					},
					{
						code: '10 07 04',
						description: 'Other particulates and dust',
						type: 'Non-Hazardous',
						axis: 'waste:W-100704-Non-Hazardous-OtherParticulatesAndDustMember',
					},
					{
						code: '10 07 05',
						description: 'Sludges and filter cakes from gas treatment',
						type: 'Non-Hazardous',
						axis: 'waste:W-100705-Non-Hazardous-SludgesAndFilterCakesFromGasTreatmentMember',
					},
					{
						code: '10 07 07',
						description: 'Wastes from cooling-water treatment containing oil',
						type: 'Hazardous',
						axis: 'waste:W-100707-Hazardous-WastesFromCooling-WaterTreatmentContainingOilMember',
					},
					{
						code: '10 07 08',
						description:
							'Wastes from cooling-water treatment other than those mentioned in 10 07 07',
						type: 'Non-Hazardous',
						axis: 'waste:W-100708-Non-Hazardous-WastesFromCooling-WaterTreatmentOtherThanThoseMentionedIn100707Member',
					},
					{
						code: '10 07 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-100799-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Wastes from other non-ferrous thermal metallurgy',
				codes: [
					{
						code: '10 08 04',
						description: 'Particulates and dust',
						type: 'Non-Hazardous',
						axis: 'waste:W-100804-Non-Hazardous-ParticulatesAndDustMember',
					},
					{
						code: '10 08 08',
						description: 'Salt slag from primary and secondary production',
						type: 'Hazardous',
						axis: 'waste:W-100808-Hazardous-SaltSlagFromPrimaryAndSecondaryProductionMember',
					},
					{
						code: '10 08 09',
						description: 'Other slags',
						type: 'Non-Hazardous',
						axis: 'waste:W-100809-Non-Hazardous-OtherSlagsMember',
					},
					{
						code: '10 08 10',
						description:
							'Dross and skimmings that are flammable or emit upon contact with water flammable gases in hazardous quantities',
						type: 'Hazardous',
						axis: 'waste:W-100810-Hazardous-DrossAndSkimmingsThatAreFlammableOrEmitUponContactWithWaterFlammableGasesInHazardousQuantitiesMember',
					},
					{
						code: '10 08 11',
						description:
							'Dross and skimmings other than those mentioned in 10 08 10',
						type: 'Non-Hazardous',
						axis: 'waste:W-100811-Non-Hazardous-DrossAndSkimmingsOtherThanThoseMentionedIn100810Member',
					},
					{
						code: '10 08 12',
						description: 'Tar-containing wastes from anode manufacture',
						type: 'Hazardous',
						axis: 'waste:W-100812-Hazardous-Tar-ContainingWastesFromAnodeManufactureMember',
					},
					{
						code: '10 08 13',
						description:
							'Carbon-containing wastes from anode manufacture other than those mentioned in 10 08 12',
						type: 'Non-Hazardous',
						axis: 'waste:W-100813-Non-Hazardous-Carbon-ContainingWastesFromAnodeManufactureOtherThanThoseMentionedIn100812Member',
					},
					{
						code: '10 08 14',
						description: 'Anode scrap',
						type: 'Non-Hazardous',
						axis: 'waste:W-100814-Non-Hazardous-AnodeScrapMember',
					},
					{
						code: '10 08 15',
						description: 'Flue-gas dust containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-100815-Hazardous-Flue-GasDustContainingHazardousSubstancesMember',
					},
					{
						code: '10 08 16',
						description: 'Flue-gas dust other than those mentioned in 10 08 15',
						type: 'Non-Hazardous',
						axis: 'waste:W-100816-Non-Hazardous-Flue-GasDustOtherThanThoseMentionedIn100815Member',
					},
					{
						code: '10 08 17',
						description:
							'Sludges and filter cakes from flue-gas treatment containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-100817-Hazardous-SludgesAndFilterCakesFromFlue-GasTreatmentContainingHazardousSubstancesMember',
					},
					{
						code: '10 08 18',
						description:
							'Sludges and filter cakes from flue-gas treatment other than those mentioned in 10 08 17',
						type: 'Non-Hazardous',
						axis: 'waste:W-100818-Non-Hazardous-SludgesAndFilterCakesFromFlue-GasTreatmentOtherThanThoseMentionedIn100817Member',
					},
					{
						code: '10 08 19',
						description: 'Wastes from cooling-water treatment containing oil',
						type: 'Hazardous',
						axis: 'waste:W-100819-Hazardous-WastesFromCooling-WaterTreatmentContainingOilMember',
					},
					{
						code: '10 08 20',
						description:
							'Wastes from cooling-water treatment other than those mentioned in 10 08 19',
						type: 'Non-Hazardous',
						axis: 'waste:W-100820-Non-Hazardous-WastesFromCooling-WaterTreatmentOtherThanThoseMentionedIn100819Member',
					},
					{
						code: '10 08 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-100899-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Wastes from casting of ferrous pieces',
				codes: [
					{
						code: '10 09 03',
						description: 'Furnace slag',
						type: 'Non-Hazardous',
						axis: 'waste:W-100903-Non-Hazardous-FurnaceSlagMember',
					},
					{
						code: '10 09 05',
						description:
							'Casting cores and moulds which have not undergone pouring containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-100905-Hazardous-CastingCoresAndMouldsWhichHaveNotUndergonePouringContainingHazardousSubstancesMember',
					},
					{
						code: '10 09 06',
						description:
							'Casting cores and moulds which have not undergone pouring other than those mentioned in 10 09 05',
						type: 'Non-Hazardous',
						axis: 'waste:W-100906-Non-Hazardous-CastingCoresAndMouldsWhichHaveNotUndergonePouringOtherThanThoseMentionedIn100905Member',
					},
					{
						code: '10 09 07',
						description:
							'Casting cores and moulds which have undergone pouring containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-100907-Hazardous-CastingCoresAndMouldsWhichHaveUndergonePouringContainingHazardousSubstancesMember',
					},
					{
						code: '10 09 08',
						description:
							'Casting cores and moulds which have undergone pouring other than those mentioned in 10 09 07',
						type: 'Non-Hazardous',
						axis: 'waste:W-100908-Non-Hazardous-CastingCoresAndMouldsWhichHaveUndergonePouringOtherThanThoseMentionedIn100907Member',
					},
					{
						code: '10 09 09',
						description: 'Flue-gas dust containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-100909-Hazardous-Flue-GasDustContainingHazardousSubstancesMember',
					},
					{
						code: '10 09 10',
						description: 'Flue-gas dust other than those mentioned in 10 09 09',
						type: 'Non-Hazardous',
						axis: 'waste:W-100910-Non-Hazardous-Flue-GasDustOtherThanThoseMentionedIn100909Member',
					},
					{
						code: '10 09 11',
						description: 'Other particulates containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-100911-Hazardous-OtherParticulatesContainingHazardousSubstancesMember',
					},
					{
						code: '10 09 12',
						description:
							'Other particulates other than those mentioned in 10 09 11',
						type: 'Non-Hazardous',
						axis: 'waste:W-100912-Non-Hazardous-OtherParticulatesOtherThanThoseMentionedIn100911Member',
					},
					{
						code: '10 09 13',
						description: 'Waste binders containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-100913-Hazardous-WasteBindersContainingHazardousSubstancesMember',
					},
					{
						code: '10 09 14',
						description: 'Waste binders other than those mentioned in 10 09 13',
						type: 'Non-Hazardous',
						axis: 'waste:W-100914-Non-Hazardous-WasteBindersOtherThanThoseMentionedIn100913Member',
					},
					{
						code: '10 09 15',
						description:
							'Waste crack-indicating agent containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-100915-Hazardous-WasteCrack-IndicatingAgentContainingHazardousSubstancesMember',
					},
					{
						code: '10 09 16',
						description:
							'Waste crack-indicating agent other than those mentioned in 10 09 15',
						type: 'Non-Hazardous',
						axis: 'waste:W-100916-Non-Hazardous-WasteCrack-IndicatingAgentOtherThanThoseMentionedIn100915Member',
					},
					{
						code: '10 09 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-100999-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Wastes from casting of non-ferrous pieces',
				codes: [
					{
						code: '10 10 03',
						description: 'Furnace slag',
						type: 'Non-Hazardous',
						axis: 'waste:W-101003-Non-Hazardous-FurnaceSlagMember',
					},
					{
						code: '10 10 05',
						description:
							'Casting cores and moulds which have not undergone pouring containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-101005-Hazardous-CastingCoresAndMouldsWhichHaveNotUndergonePouringContainingHazardousSubstancesMember',
					},
					{
						code: '10 10 06',
						description:
							'Casting cores and moulds which have not undergone pouring other than those mentioned in 10 10 05',
						type: 'Non-Hazardous',
						axis: 'waste:W-101006-Non-Hazardous-CastingCoresAndMouldsWhichHaveNotUndergonePouringOtherThanThoseMentionedIn101005Member',
					},
					{
						code: '10 10 07',
						description:
							'Casting cores and moulds which have undergone pouring containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-101007-Hazardous-CastingCoresAndMouldsWhichHaveUndergonePouringContainingHazardousSubstancesMember',
					},
					{
						code: '10 10 08',
						description:
							'Casting cores and moulds which have undergone pouring other than those mentioned in 10 10 07',
						type: 'Non-Hazardous',
						axis: 'waste:W-101008-Non-Hazardous-CastingCoresAndMouldsWhichHaveUndergonePouringOtherThanThoseMentionedIn101007Member',
					},
					{
						code: '10 10 09',
						description: 'Flue-gas dust containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-101009-Hazardous-Flue-GasDustContainingHazardousSubstancesMember',
					},
					{
						code: '10 10 10',
						description: 'Flue-gas dust other than those mentioned in 10 10 09',
						type: 'Non-Hazardous',
						axis: 'waste:W-101010-Non-Hazardous-Flue-GasDustOtherThanThoseMentionedIn101009Member',
					},
					{
						code: '10 10 11',
						description: 'Other particulates containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-101011-Hazardous-OtherParticulatesContainingHazardousSubstancesMember',
					},
					{
						code: '10 10 12',
						description:
							'Other particulates other than those mentioned in 10 10 11',
						type: 'Non-Hazardous',
						axis: 'waste:W-101012-Non-Hazardous-OtherParticulatesOtherThanThoseMentionedIn101011Member',
					},
					{
						code: '10 10 13',
						description: 'Waste binders containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-101013-Hazardous-WasteBindersContainingHazardousSubstancesMember',
					},
					{
						code: '10 10 14',
						description: 'Waste binders other than those mentioned in 10 10 13',
						type: 'Non-Hazardous',
						axis: 'waste:W-101014-Non-Hazardous-WasteBindersOtherThanThoseMentionedIn101013Member',
					},
					{
						code: '10 10 15',
						description:
							'Waste crack-indicating agent containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-101015-Hazardous-WasteCrack-IndicatingAgentContainingHazardousSubstancesMember',
					},
					{
						code: '10 10 16',
						description:
							'Waste crack-indicating agent other than those mentioned in 10 10 15',
						type: 'Non-Hazardous',
						axis: 'waste:W-101016-Non-Hazardous-WasteCrack-IndicatingAgentOtherThanThoseMentionedIn101015Member',
					},
					{
						code: '10 10 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-101099-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Wastes from manufacture of glass and glass products',
				codes: [
					{
						code: '10 11 03',
						description: 'Waste glass-based fibrous materials',
						type: 'Non-Hazardous',
						axis: 'waste:W-101103-Non-Hazardous-WasteGlass-BasedFibrousMaterialsMember',
					},
					{
						code: '10 11 05',
						description: 'Particulates and dust',
						type: 'Non-Hazardous',
						axis: 'waste:W-101105-Non-Hazardous-ParticulatesAndDustMember',
					},
					{
						code: '10 11 09',
						description:
							'Waste preparation mixture before thermal processing containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-101109-Hazardous-WastePreparationMixtureBeforeThermalProcessingContainingHazardousSubstancesMember',
					},
					{
						code: '10 11 10',
						description:
							'Waste preparation mixture before thermal processing other than those mentioned in 10 11 09',
						type: 'Non-Hazardous',
						axis: 'waste:W-101110-Non-Hazardous-WastePreparationMixtureBeforeThermalProcessingOtherThanThoseMentionedIn101109Member',
					},
					{
						code: '10 11 11',
						description:
							'Waste glass in small particles and glass powder containing heavy metals for example from cathode ray tubes',
						type: 'Hazardous',
						axis: 'waste:W-101111-Hazardous-WasteGlassInSmallParticlesAndGlassPowderContainingHeavyMetalsForExampleFromCathodeRayTubesMember',
					},
					{
						code: '10 11 12',
						description: 'Waste glass other than those mentioned in 10 11 11',
						type: 'Non-Hazardous',
						axis: 'waste:W-101112-Non-Hazardous-WasteGlassOtherThanThoseMentionedIn101111Member',
					},
					{
						code: '10 11 13',
						description:
							'Glass-polishing and-grinding sludge containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-101113-Hazardous-Glass-PolishingAnd-GrindingSludgeContainingHazardousSubstancesMember',
					},
					{
						code: '10 11 14',
						description:
							'Glass-polishing and-grinding sludge other than those mentioned in 10 11 13',
						type: 'Non-Hazardous',
						axis: 'waste:W-101114-Non-Hazardous-Glass-PolishingAnd-GrindingSludgeOtherThanThoseMentionedIn101113Member',
					},
					{
						code: '10 11 15',
						description:
							'Solid wastes from flue-gas treatment containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-101115-Hazardous-SolidWastesFromFlue-GasTreatmentContainingHazardousSubstancesMember',
					},
					{
						code: '10 11 16',
						description:
							'Solid wastes from flue-gas treatment other than those mentioned in 10 11 15',
						type: 'Non-Hazardous',
						axis: 'waste:W-101116-Non-Hazardous-SolidWastesFromFlue-GasTreatmentOtherThanThoseMentionedIn101115Member',
					},
					{
						code: '10 11 17',
						description:
							'Sludges and filter cakes from flue-gas treatment containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-101117-Hazardous-SludgesAndFilterCakesFromFlue-GasTreatmentContainingHazardousSubstancesMember',
					},
					{
						code: '10 11 18',
						description:
							'Sludges and filter cakes from flue-gas treatment other than those mentioned in 10 11 17',
						type: 'Non-Hazardous',
						axis: 'waste:W-101118-Non-Hazardous-SludgesAndFilterCakesFromFlue-GasTreatmentOtherThanThoseMentionedIn101117Member',
					},
					{
						code: '10 11 19',
						description:
							'Solid wastes from on-site effluent treatment containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-101119-Hazardous-SolidWastesFromOn-SiteEffluentTreatmentContainingHazardousSubstancesMember',
					},
					{
						code: '10 11 20',
						description:
							'Solid wastes from on-site effluent treatment other than those mentioned in 10 11 19',
						type: 'Non-Hazardous',
						axis: 'waste:W-101120-Non-Hazardous-SolidWastesFromOn-SiteEffluentTreatmentOtherThanThoseMentionedIn101119Member',
					},
					{
						code: '10 11 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-101199-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label:
					'Wastes from manufacture of ceramic goods bricks tiles and construction products',
				codes: [
					{
						code: '10 12 01',
						description: 'Waste preparation mixture before thermal processing',
						type: 'Non-Hazardous',
						axis: 'waste:W-101201-Non-Hazardous-WastePreparationMixtureBeforeThermalProcessingMember',
					},
					{
						code: '10 12 03',
						description: 'Particulates and dust',
						type: 'Non-Hazardous',
						axis: 'waste:W-101203-Non-Hazardous-ParticulatesAndDustMember',
					},
					{
						code: '10 12 05',
						description: 'Sludges and filter cakes from gas treatment',
						type: 'Non-Hazardous',
						axis: 'waste:W-101205-Non-Hazardous-SludgesAndFilterCakesFromGasTreatmentMember',
					},
					{
						code: '10 12 06',
						description: 'Discarded moulds',
						type: 'Non-Hazardous',
						axis: 'waste:W-101206-Non-Hazardous-DiscardedMouldsMember',
					},
					{
						code: '10 12 08',
						description:
							'Waste ceramics bricks tiles and construction products after thermal processing',
						type: 'Non-Hazardous',
						axis: 'waste:W-101208-Non-Hazardous-WasteCeramicsBricksTilesAndConstructionProductsAfterThermalProcessingMember',
					},
					{
						code: '10 12 09',
						description:
							'Solid wastes from gas treatment containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-101209-Hazardous-SolidWastesFromGasTreatmentContainingHazardousSubstancesMember',
					},
					{
						code: '10 12 10',
						description:
							'Solid wastes from gas treatment other than those mentioned in 10 12 09',
						type: 'Non-Hazardous',
						axis: 'waste:W-101210-Non-Hazardous-SolidWastesFromGasTreatmentOtherThanThoseMentionedIn101209Member',
					},
					{
						code: '10 12 11',
						description: 'Wastes from glazing containing heavy metals',
						type: 'Hazardous',
						axis: 'waste:W-101211-Hazardous-WastesFromGlazingContainingHeavyMetalsMember',
					},
					{
						code: '10 12 12',
						description:
							'Wastes from glazing other than those mentioned in 10 12 11',
						type: 'Non-Hazardous',
						axis: 'waste:W-101212-Non-Hazardous-WastesFromGlazingOtherThanThoseMentionedIn101211Member',
					},
					{
						code: '10 12 13',
						description: 'Sludge from on-site effluent treatment',
						type: 'Non-Hazardous',
						axis: 'waste:W-101213-Non-Hazardous-SludgeFromOn-SiteEffluentTreatmentMember',
					},
					{
						code: '10 12 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-101299-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label:
					'Wastes from manufacture of cement lime and plaster and articles and products made from them',
				codes: [
					{
						code: '10 13 01',
						description: 'Waste preparation mixture before thermal processing',
						type: 'Non-Hazardous',
						axis: 'waste:W-101301-Non-Hazardous-WastePreparationMixtureBeforeThermalProcessingMember',
					},
					{
						code: '10 13 04',
						description: 'Wastes from calcination and hydration of lime',
						type: 'Non-Hazardous',
						axis: 'waste:W-101304-Non-Hazardous-WastesFromCalcinationAndHydrationOfLimeMember',
					},
					{
						code: '10 13 06',
						description: 'Particulates and dust except 10 13 12 and 10 13 13',
						type: 'Non-Hazardous',
						axis: 'waste:W-101306-Non-Hazardous-ParticulatesAndDustExcept101312And101313Member',
					},
					{
						code: '10 13 07',
						description: 'Sludges and filter cakes from gas treatment',
						type: 'Non-Hazardous',
						axis: 'waste:W-101307-Non-Hazardous-SludgesAndFilterCakesFromGasTreatmentMember',
					},
					{
						code: '10 13 09',
						description:
							'Wastes from asbestos-cement manufacture containing asbestos',
						type: 'Hazardous',
						axis: 'waste:W-101309-Hazardous-WastesFromAsbestos-CementManufactureContainingAsbestosMember',
					},
					{
						code: '10 13 10',
						description:
							'Wastes from asbestos-cement manufacture other than those mentioned in 10 13 09',
						type: 'Non-Hazardous',
						axis: 'waste:W-101310-Non-Hazardous-WastesFromAsbestos-CementManufactureOtherThanThoseMentionedIn101309Member',
					},
					{
						code: '10 13 11',
						description:
							'Wastes from cement-based composite materials other than those mentioned in 10 13 09 and 10 13 10',
						type: 'Non-Hazardous',
						axis: 'waste:W-101311-Non-Hazardous-WastesFromCement-BasedCompositeMaterialsOtherThanThoseMentionedIn101309And101310Member',
					},
					{
						code: '10 13 12',
						description:
							'Solid wastes from gas treatment containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-101312-Hazardous-SolidWastesFromGasTreatmentContainingHazardousSubstancesMember',
					},
					{
						code: '10 13 13',
						description:
							'Solid wastes from gas treatment other than those mentioned in 10 13 12',
						type: 'Non-Hazardous',
						axis: 'waste:W-101313-Non-Hazardous-SolidWastesFromGasTreatmentOtherThanThoseMentionedIn101312Member',
					},
					{
						code: '10 13 14',
						description: 'Waste concrete and concrete sludge',
						type: 'Non-Hazardous',
						axis: 'waste:W-101314-Non-Hazardous-WasteConcreteAndConcreteSludgeMember',
					},
					{
						code: '10 13 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-101399-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Waste from crematoria',
				codes: [
					{
						code: '10 14 01',
						description: 'Waste from gas cleaning containing mercury',
						type: 'Hazardous',
						axis: 'waste:W-101401-Hazardous-WasteFromGasCleaningContainingMercuryMember',
					},
				],
			},
		],
	},
	{
		id: 11,
		label:
			'WASTES FROM CHEMICAL SURFACE TREATMENT AND COATING OF METALS AND OTHER MATERIALS; NON-FERROUS HYDRO-METALLURGY',
		subcategories: [
			{
				label:
					'Wastes from chemical surface treatment and coating of metals and other materials for example galvanic processes zinc coating processes pickling processes etching phosphating alkaline degreasing anodising',
				codes: [
					{
						code: '11 01 05',
						description: 'Pickling acids',
						type: 'Hazardous',
						axis: 'waste:W-110105-Hazardous-PicklingAcidsMember',
					},
					{
						code: '11 01 06',
						description: 'Acids not otherwise specified',
						type: 'Hazardous',
						axis: 'waste:W-110106-Hazardous-AcidsNotOtherwiseSpecifiedMember',
					},
					{
						code: '11 01 07',
						description: 'Pickling bases',
						type: 'Hazardous',
						axis: 'waste:W-110107-Hazardous-PicklingBasesMember',
					},
					{
						code: '11 01 08',
						description: 'Phosphatising sludges',
						type: 'Hazardous',
						axis: 'waste:W-110108-Hazardous-PhosphatisingSludgesMember',
					},
					{
						code: '11 01 09',
						description:
							'Sludges and filter cakes containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-110109-Hazardous-SludgesAndFilterCakesContainingHazardousSubstancesMember',
					},
					{
						code: '11 01 10',
						description:
							'Sludges and filter cakes other than those mentioned in 11 01 09',
						type: 'Non-Hazardous',
						axis: 'waste:W-110110-Non-Hazardous-SludgesAndFilterCakesOtherThanThoseMentionedIn110109Member',
					},
					{
						code: '11 01 11',
						description:
							'Aqueous rinsing liquids containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-110111-Hazardous-AqueousRinsingLiquidsContainingHazardousSubstancesMember',
					},
					{
						code: '11 01 12',
						description:
							'Aqueous rinsing liquids other than those mentioned in 11 01 11',
						type: 'Non-Hazardous',
						axis: 'waste:W-110112-Non-Hazardous-AqueousRinsingLiquidsOtherThanThoseMentionedIn110111Member',
					},
					{
						code: '11 01 13',
						description: 'Degreasing wastes containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-110113-Hazardous-DegreasingWastesContainingHazardousSubstancesMember',
					},
					{
						code: '11 01 14',
						description:
							'Degreasing wastes other than those mentioned in 11 01 13',
						type: 'Non-Hazardous',
						axis: 'waste:W-110114-Non-Hazardous-DegreasingWastesOtherThanThoseMentionedIn110113Member',
					},
					{
						code: '11 01 15',
						description:
							'Eluate and sludges from membrane systems or ion exchange systems containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-110115-Hazardous-EluateAndSludgesFromMembraneSystemsOrIonExchangeSystemsContainingHazardousSubstancesMember',
					},
					{
						code: '11 01 16',
						description: 'Saturated or spent ion exchange resins',
						type: 'Hazardous',
						axis: 'waste:W-110116-Hazardous-SaturatedOrSpentIonExchangeResinsMember',
					},
					{
						code: '11 01 98',
						description: 'Other wastes containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-110198-Hazardous-OtherWastesContainingHazardousSubstancesMember',
					},
					{
						code: '11 01 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-110199-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Wastes from non-ferrous hydrometallurgical processes',
				codes: [
					{
						code: '11 02 02',
						description:
							'Sludges from zinc hydrometallurgy including jarosite goethite',
						type: 'Hazardous',
						axis: 'waste:W-110202-Hazardous-SludgesFromZincHydrometallurgyIncludingJarositeGoethiteMember',
					},
					{
						code: '11 02 03',
						description:
							'Wastes from the production of anodes for aqueous electrolytical processes',
						type: 'Non-Hazardous',
						axis: 'waste:W-110203-Non-Hazardous-WastesFromTheProductionOfAnodesForAqueousElectrolyticalProcessesMember',
					},
					{
						code: '11 02 05',
						description:
							'Wastes from copper hydrometallurgical processes containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-110205-Hazardous-WastesFromCopperHydrometallurgicalProcessesContainingHazardousSubstancesMember',
					},
					{
						code: '11 02 06',
						description:
							'Wastes from copper hydrometallurgical processes other than those mentioned in 11 02 05',
						type: 'Non-Hazardous',
						axis: 'waste:W-110206-Non-Hazardous-WastesFromCopperHydrometallurgicalProcessesOtherThanThoseMentionedIn110205Member',
					},
					{
						code: '11 02 07',
						description: 'Other wastes containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-110207-Hazardous-OtherWastesContainingHazardousSubstancesMember',
					},
					{
						code: '11 02 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-110299-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Sludges and solids from tempering processes',
				codes: [
					{
						code: '11 03 01',
						description: 'Wastes containing cyanide',
						type: 'Hazardous',
						axis: 'waste:W-110301-Hazardous-WastesContainingCyanideMember',
					},
					{
						code: '11 03 02',
						description: 'Other wastes',
						type: 'Hazardous',
						axis: 'waste:W-110302-Hazardous-OtherWastesMember',
					},
				],
			},
			{
				label: 'Wastes from hot galvanising processes',
				codes: [
					{
						code: '11 05 01',
						description: 'Hard zinc',
						type: 'Non-Hazardous',
						axis: 'waste:W-110501-Non-Hazardous-HardZincMember',
					},
					{
						code: '11 05 02',
						description: 'Zinc ash',
						type: 'Non-Hazardous',
						axis: 'waste:W-110502-Non-Hazardous-ZincAshMember',
					},
					{
						code: '11 05 03',
						description: 'Solid wastes from gas treatment',
						type: 'Hazardous',
						axis: 'waste:W-110503-Hazardous-SolidWastesFromGasTreatmentMember',
					},
					{
						code: '11 05 04',
						description: 'Spent flux',
						type: 'Hazardous',
						axis: 'waste:W-110504-Hazardous-SpentFluxMember',
					},
					{
						code: '11 05 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-110599-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
		],
	},
	{
		id: 12,
		label:
			'WASTES FROM SHAPING AND PHYSICAL AND MECHANICAL SURFACE TREATMENT OF METALS AND PLASTICS',
		subcategories: [
			{
				label:
					'Wastes from shaping and physical and mechanical surface treatment of metals and plastics',
				codes: [
					{
						code: '12 01 01',
						description: 'Ferrous metal filings and turnings',
						type: 'Non-Hazardous',
						axis: 'waste:W-120101-Non-Hazardous-FerrousMetalFilingsAndTurningsMember',
					},
					{
						code: '12 01 02',
						description: 'Ferrous metal dust and particles',
						type: 'Non-Hazardous',
						axis: 'waste:W-120102-Non-Hazardous-FerrousMetalDustAndParticlesMember',
					},
					{
						code: '12 01 03',
						description: 'Non-ferrous metal filings and turnings',
						type: 'Non-Hazardous',
						axis: 'waste:W-120103-Non-Hazardous-Non-FerrousMetalFilingsAndTurningsMember',
					},
					{
						code: '12 01 04',
						description: 'Non-ferrous metal dust and particles',
						type: 'Non-Hazardous',
						axis: 'waste:W-120104-Non-Hazardous-Non-FerrousMetalDustAndParticlesMember',
					},
					{
						code: '12 01 05',
						description: 'Plastics shavings and turnings',
						type: 'Non-Hazardous',
						axis: 'waste:W-120105-Non-Hazardous-PlasticsShavingsAndTurningsMember',
					},
					{
						code: '12 01 06',
						description:
							'Mineral-based machining oils containing halogens except emulsions and solutions',
						type: 'Hazardous',
						axis: 'waste:W-120106-Hazardous-Mineral-BasedMachiningOilsContainingHalogensExceptEmulsionsAndSolutionsMember',
					},
					{
						code: '12 01 07',
						description:
							'Mineral-based machining oils free of halogens except emulsions and solutions',
						type: 'Hazardous',
						axis: 'waste:W-120107-Hazardous-Mineral-BasedMachiningOilsFreeOfHalogensExceptEmulsionsAndSolutionsMember',
					},
					{
						code: '12 01 08',
						description:
							'Machining emulsions and solutions containing halogens',
						type: 'Hazardous',
						axis: 'waste:W-120108-Hazardous-MachiningEmulsionsAndSolutionsContainingHalogensMember',
					},
					{
						code: '12 01 09',
						description: 'Machining emulsions and solutions free of halogens',
						type: 'Hazardous',
						axis: 'waste:W-120109-Hazardous-MachiningEmulsionsAndSolutionsFreeOfHalogensMember',
					},
					{
						code: '12 01 10',
						description: 'Synthetic machining oils',
						type: 'Hazardous',
						axis: 'waste:W-120110-Hazardous-SyntheticMachiningOilsMember',
					},
					{
						code: '12 01 12',
						description: 'Spent waxes and fats',
						type: 'Hazardous',
						axis: 'waste:W-120112-Hazardous-SpentWaxesAndFatsMember',
					},
					{
						code: '12 01 13',
						description: 'Welding wastes',
						type: 'Non-Hazardous',
						axis: 'waste:W-120113-Non-Hazardous-WeldingWastesMember',
					},
					{
						code: '12 01 14',
						description: 'Machining sludges containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-120114-Hazardous-MachiningSludgesContainingHazardousSubstancesMember',
					},
					{
						code: '12 01 15',
						description:
							'Machining sludges other than those mentioned in 12 01 14',
						type: 'Non-Hazardous',
						axis: 'waste:W-120115-Non-Hazardous-MachiningSludgesOtherThanThoseMentionedIn120114Member',
					},
					{
						code: '12 01 16',
						description:
							'Waste blasting material containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-120116-Hazardous-WasteBlastingMaterialContainingHazardousSubstancesMember',
					},
					{
						code: '12 01 17',
						description:
							'Waste blasting material other than those mentioned in 12 01 16',
						type: 'Non-Hazardous',
						axis: 'waste:W-120117-Non-Hazardous-WasteBlastingMaterialOtherThanThoseMentionedIn120116Member',
					},
					{
						code: '12 01 18',
						description:
							'Metal sludge grinding honing and lapping sludge containing oil',
						type: 'Hazardous',
						axis: 'waste:W-120118-Hazardous-MetalSludgeGrindingHoningAndLappingSludgeContainingOilMember',
					},
					{
						code: '12 01 19',
						description: 'Readily biodegradable machining oil',
						type: 'Hazardous',
						axis: 'waste:W-120119-Hazardous-ReadilyBiodegradableMachiningOilMember',
					},
					{
						code: '12 01 20',
						description:
							'Spent grinding bodies and grinding materials containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-120120-Hazardous-SpentGrindingBodiesAndGrindingMaterialsContainingHazardousSubstancesMember',
					},
					{
						code: '12 01 21',
						description:
							'Spent grinding bodies and grinding materials other than those mentioned in 12 01 20',
						type: 'Non-Hazardous',
						axis: 'waste:W-120121-Non-Hazardous-SpentGrindingBodiesAndGrindingMaterialsOtherThanThoseMentionedIn120120Member',
					},
					{
						code: '12 01 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-120199-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Wastes from water and steam degreasing processes except 11',
				codes: [
					{
						code: '12 03 01',
						description: 'Aqueous washing liquids',
						type: 'Hazardous',
						axis: 'waste:W-120301-Hazardous-AqueousWashingLiquidsMember',
					},
					{
						code: '12 03 02',
						description: 'Steam degreasing wastes',
						type: 'Hazardous',
						axis: 'waste:W-120302-Hazardous-SteamDegreasingWastesMember',
					},
				],
			},
		],
	},
	{
		id: 13,
		label:
			'OIL WASTES AND WASTES OF LIQUID FUELS EXCEPT EDIBLE OILS AND THOSE IN CHAPTERS 05 12 AND 19',
		subcategories: [
			{
				label: 'Waste hydraulic oils',
				codes: [
					{
						code: '13 01 01',
						description: 'Hydraulic oils containing PCBs',
						type: 'Hazardous',
						axis: 'waste:W-130101-Hazardous-HydraulicOilsContainingPcbsMember',
					},
					{
						code: '13 01 04',
						description: 'Chlorinated emulsions',
						type: 'Hazardous',
						axis: 'waste:W-130104-Hazardous-ChlorinatedEmulsionsMember',
					},
					{
						code: '13 01 05',
						description: 'Non-chlorinated emulsions',
						type: 'Hazardous',
						axis: 'waste:W-130105-Hazardous-Non-ChlorinatedEmulsionsMember',
					},
					{
						code: '13 01 09',
						description: 'Mineral-based chlorinated hydraulic oils',
						type: 'Hazardous',
						axis: 'waste:W-130109-Hazardous-Mineral-BasedChlorinatedHydraulicOilsMember',
					},
					{
						code: '13 01 10',
						description: 'Mineral based non-chlorinated hydraulic oils',
						type: 'Hazardous',
						axis: 'waste:W-130110-Hazardous-MineralBasedNon-ChlorinatedHydraulicOilsMember',
					},
					{
						code: '13 01 11',
						description: 'Synthetic hydraulic oils',
						type: 'Hazardous',
						axis: 'waste:W-130111-Hazardous-SyntheticHydraulicOilsMember',
					},
					{
						code: '13 01 12',
						description: 'Readily biodegradable hydraulic oils',
						type: 'Hazardous',
						axis: 'waste:W-130112-Hazardous-ReadilyBiodegradableHydraulicOilsMember',
					},
					{
						code: '13 01 13',
						description: 'Other hydraulic oils',
						type: 'Hazardous',
						axis: 'waste:W-130113-Hazardous-OtherHydraulicOilsMember',
					},
				],
			},
			{
				label: 'Waste engine gear and lubricating oils',
				codes: [
					{
						code: '13 02 04',
						description:
							'Mineral-based chlorinated engine gear and lubricating oils',
						type: 'Hazardous',
						axis: 'waste:W-130204-Hazardous-Mineral-BasedChlorinatedEngineGearAndLubricatingOilsMember',
					},
					{
						code: '13 02 05',
						description:
							'Mineral-based non-chlorinated engine gear and lubricating oils',
						type: 'Hazardous',
						axis: 'waste:W-130205-Hazardous-Mineral-BasedNon-ChlorinatedEngineGearAndLubricatingOilsMember',
					},
					{
						code: '13 02 06',
						description: 'Synthetic engine gear and lubricating oils',
						type: 'Hazardous',
						axis: 'waste:W-130206-Hazardous-SyntheticEngineGearAndLubricatingOilsMember',
					},
					{
						code: '13 02 07',
						description:
							'Readily biodegradable engine gear and lubricating oils',
						type: 'Hazardous',
						axis: 'waste:W-130207-Hazardous-ReadilyBiodegradableEngineGearAndLubricatingOilsMember',
					},
					{
						code: '13 02 08',
						description: 'Other engine gear and lubricating oils',
						type: 'Hazardous',
						axis: 'waste:W-130208-Hazardous-OtherEngineGearAndLubricatingOilsMember',
					},
				],
			},
			{
				label: 'Waste insulating and heat transmission oils',
				codes: [
					{
						code: '13 03 01',
						description: 'Insulating or heat transmission oils containing PCBs',
						type: 'Hazardous',
						axis: 'waste:W-130301-Hazardous-InsulatingOrHeatTransmissionOilsContainingPcbsMember',
					},
					{
						code: '13 03 06',
						description:
							'Mineral-based chlorinated insulating and heat transmission oils other than those mentioned in 13 03 01',
						type: 'Hazardous',
						axis: 'waste:W-130306-Hazardous-Mineral-BasedChlorinatedInsulatingAndHeatTransmissionOilsOtherThanThoseMentionedIn130301Member',
					},
					{
						code: '13 03 07',
						description:
							'Mineral-based non-chlorinated insulating and heat transmission oils',
						type: 'Hazardous',
						axis: 'waste:W-130307-Hazardous-Mineral-BasedNon-ChlorinatedInsulatingAndHeatTransmissionOilsMember',
					},
					{
						code: '13 03 08',
						description: 'Synthetic insulating and heat transmission oils',
						type: 'Hazardous',
						axis: 'waste:W-130308-Hazardous-SyntheticInsulatingAndHeatTransmissionOilsMember',
					},
					{
						code: '13 03 09',
						description:
							'Readily biodegradable insulating and heat transmission oils',
						type: 'Hazardous',
						axis: 'waste:W-130309-Hazardous-ReadilyBiodegradableInsulatingAndHeatTransmissionOilsMember',
					},
					{
						code: '13 03 10',
						description: 'Other insulating and heat transmission oils',
						type: 'Hazardous',
						axis: 'waste:W-130310-Hazardous-OtherInsulatingAndHeatTransmissionOilsMember',
					},
				],
			},
			{
				label: 'Bilge oils',
				codes: [
					{
						code: '13 04 01',
						description: 'Bilge oils from inland navigation',
						type: 'Hazardous',
						axis: 'waste:W-130401-Hazardous-BilgeOilsFromInlandNavigationMember',
					},
					{
						code: '13 04 02',
						description: 'Bilge oils from jetty sewers',
						type: 'Hazardous',
						axis: 'waste:W-130402-Hazardous-BilgeOilsFromJettySewersMember',
					},
					{
						code: '13 04 03',
						description: 'Bilge oils from other navigation',
						type: 'Hazardous',
						axis: 'waste:W-130403-Hazardous-BilgeOilsFromOtherNavigationMember',
					},
				],
			},
			{
				label: 'Oil water separator contents',
				codes: [
					{
						code: '13 05 01',
						description: 'Solids from grit chambers and oil water separators',
						type: 'Hazardous',
						axis: 'waste:W-130501-Hazardous-SolidsFromGritChambersAndOilWaterSeparatorsMember',
					},
					{
						code: '13 05 02',
						description: 'Sludges from oil water separators',
						type: 'Hazardous',
						axis: 'waste:W-130502-Hazardous-SludgesFromOilWaterSeparatorsMember',
					},
					{
						code: '13 05 03',
						description: 'Interceptor sludges',
						type: 'Hazardous',
						axis: 'waste:W-130503-Hazardous-InterceptorSludgesMember',
					},
					{
						code: '13 05 06',
						description: 'Oil from oil water separators',
						type: 'Hazardous',
						axis: 'waste:W-130506-Hazardous-OilFromOilWaterSeparatorsMember',
					},
					{
						code: '13 05 07',
						description: 'Oily water from oil water separators',
						type: 'Hazardous',
						axis: 'waste:W-130507-Hazardous-OilyWaterFromOilWaterSeparatorsMember',
					},
					{
						code: '13 05 08',
						description:
							'Mixtures of wastes from grit chambers and oil water separators',
						type: 'Hazardous',
						axis: 'waste:W-130508-Hazardous-MixturesOfWastesFromGritChambersAndOilWaterSeparatorsMember',
					},
				],
			},
			{
				label: 'Wastes of liquid fuels',
				codes: [
					{
						code: '13 07 01',
						description: 'Fuel oil and diesel',
						type: 'Hazardous',
						axis: 'waste:W-130701-Hazardous-FuelOilAndDieselMember',
					},
					{
						code: '13 07 02',
						description: 'Petrol',
						type: 'Hazardous',
						axis: 'waste:W-130702-Hazardous-PetrolMember',
					},
					{
						code: '13 07 03',
						description: 'Other fuels including mixtures',
						type: 'Hazardous',
						axis: 'waste:W-130703-Hazardous-OtherFuelsIncludingMixturesMember',
					},
				],
			},
			{
				label: 'Oil wastes not otherwise specified',
				codes: [
					{
						code: '13 08 01',
						description: 'Desalter sludges or emulsions',
						type: 'Hazardous',
						axis: 'waste:W-130801-Hazardous-DesalterSludgesOrEmulsionsMember',
					},
					{
						code: '13 08 02',
						description: 'Other emulsions',
						type: 'Hazardous',
						axis: 'waste:W-130802-Hazardous-OtherEmulsionsMember',
					},
					{
						code: '13 08 99',
						description: 'Wastes not otherwise specified',
						type: 'Hazardous',
						axis: 'waste:W-130899-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
		],
	},
	{
		id: 14,
		label:
			'WASTE ORGANIC SOLVENTS, REFRIGERANTS AND PROPELLANTS (EXCEPT 07 AND 08)',
		subcategories: [
			{
				label:
					'Waste organic solvents refrigerants and foam aerosol propellants',
				codes: [
					{
						code: '14 06 01',
						description: 'Chlorofluorocarbons HCFC HFC',
						type: 'Hazardous',
						axis: 'waste:W-140601-Hazardous-ChlorofluorocarbonsHcfcHfcMember',
					},
					{
						code: '14 06 02',
						description: 'Other halogenated solvents and solvent mixtures',
						type: 'Hazardous',
						axis: 'waste:W-140602-Hazardous-OtherHalogenatedSolventsAndSolventMixturesMember',
					},
					{
						code: '14 06 03',
						description: 'Other solvents and solvent mixtures',
						type: 'Hazardous',
						axis: 'waste:W-140603-Hazardous-OtherSolventsAndSolventMixturesMember',
					},
					{
						code: '14 06 04',
						description:
							'Sludges or solid wastes containing halogenated solvents',
						type: 'Hazardous',
						axis: 'waste:W-140604-Hazardous-SludgesOrSolidWastesContainingHalogenatedSolventsMember',
					},
					{
						code: '14 06 05',
						description: 'Sludges or solid wastes containing other solvents',
						type: 'Hazardous',
						axis: 'waste:W-140605-Hazardous-SludgesOrSolidWastesContainingOtherSolventsMember',
					},
				],
			},
		],
	},
	{
		id: 15,
		label:
			'WASTE PACKAGING; ABSORBENTS, WIPING CLOTHS, FILTER MATERIALS AND PROTECTIVE CLOTHING NOT OTHERWISE SPECIFIED',
		subcategories: [
			{
				label:
					'Packaging (including separately collected municipal packaging waste)',
				codes: [
					{
						code: '15 01 01',
						description: 'Paper and cardboard packaging',
						type: 'Non-Hazardous',
						axis: 'waste:W-150101-Non-Hazardous-PaperAndCardboardPackagingMember',
					},
					{
						code: '15 01 02',
						description: 'Plastic packaging',
						type: 'Non-Hazardous',
						axis: 'waste:W-150102-Non-Hazardous-PlasticPackagingMember',
					},
					{
						code: '15 01 03',
						description: 'Wooden packaging',
						type: 'Non-Hazardous',
						axis: 'waste:W-150103-Non-Hazardous-WoodenPackagingMember',
					},
					{
						code: '15 01 04',
						description: 'Metallic packaging',
						type: 'Non-Hazardous',
						axis: 'waste:W-150104-Non-Hazardous-MetallicPackagingMember',
					},
					{
						code: '15 01 05',
						description: 'Composite packaging',
						type: 'Non-Hazardous',
						axis: 'waste:W-150105-Non-Hazardous-CompositePackagingMember',
					},
					{
						code: '15 01 06',
						description: 'Mixed packaging',
						type: 'Non-Hazardous',
						axis: 'waste:W-150106-Non-Hazardous-MixedPackagingMember',
					},
					{
						code: '15 01 07',
						description: 'Glass packaging',
						type: 'Non-Hazardous',
						axis: 'waste:W-150107-Non-Hazardous-GlassPackagingMember',
					},
					{
						code: '15 01 09',
						description: 'Textile packaging',
						type: 'Non-Hazardous',
						axis: 'waste:W-150109-Non-Hazardous-TextilePackagingMember',
					},
					{
						code: '15 01 10',
						description:
							'Packaging containing residues of or contaminated by hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-150110-Hazardous-PackagingContainingResiduesOfOrContaminatedByHazardousSubstancesMember',
					},
					{
						code: '15 01 11',
						description:
							'Metallic packaging containing a hazardous solid porous matrix for example asbestos including empty pressure containers',
						type: 'Hazardous',
						axis: 'waste:W-150111-Hazardous-MetallicPackagingContainingAHazardousSolidPorousMatrixForExampleAsbestosIncludingEmptyPressureContainersMember',
					},
				],
			},
			{
				label:
					'Absorbents, filter materials, wiping cloths and protective clothing',
				codes: [
					{
						code: '15 02 02',
						description:
							'Absorbents filter materials including oil filters not otherwise specified wiping cloths protective clothing contaminated by hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-150202-Hazardous-AbsorbentsFilterMaterialsIncludingOilFiltersNotOtherwiseSpecifiedWipingClothsProtectiveClothingContaminatedByHazardousSubstancesMember',
					},
					{
						code: '15 02 03',
						description:
							'Absorbents, filter materials, wiping cloths and protective clothing other than those mentioned in 15 02 02',
						type: 'Non-Hazardous',
						axis: 'waste:W-150203-Non-Hazardous-AbsorbentsFilterMaterialsWipingClothsAndProtectiveClothingOtherThanThoseMentionedIn150202Member',
					},
				],
			},
		],
	},
	{
		id: 16,
		label: 'WASTES NOT OTHERWISE SPECIFIED IN THE LIST',
		subcategories: [
			{
				label:
					'End-of-life vehicles from different means of transport including off-road machinery and wastes from dismantling of end-of-life vehicles and vehicle maintenance except 13 14 16 06 and 16 08',
				codes: [
					{
						code: '16 01 03',
						description: 'End-of-life tyres',
						type: 'Non-Hazardous',
						axis: 'waste:W-160103-Non-Hazardous-End-Of-LifeTyresMember',
					},
					{
						code: '16 01 04',
						description: 'End-of-life vehicles',
						type: 'Hazardous',
						axis: 'waste:W-160104-Hazardous-End-Of-LifeVehiclesMember',
					},
					{
						code: '16 01 06',
						description:
							'End-of-life vehicles containing neither liquids nor other hazardous components',
						type: 'Non-Hazardous',
						axis: 'waste:W-160106-Non-Hazardous-End-Of-LifeVehiclesContainingNeitherLiquidsNorOtherHazardousComponentsMember',
					},
					{
						code: '16 01 07',
						description: 'Oil filters',
						type: 'Hazardous',
						axis: 'waste:W-160107-Hazardous-OilFiltersMember',
					},
					{
						code: '16 01 08',
						description: 'Components containing mercury',
						type: 'Hazardous',
						axis: 'waste:W-160108-Hazardous-ComponentsContainingMercuryMember',
					},
					{
						code: '16 01 09',
						description: 'Components containing PCBs',
						type: 'Hazardous',
						axis: 'waste:W-160109-Hazardous-ComponentsContainingPcbsMember',
					},
					{
						code: '16 01 10',
						description: 'Explosive components for example air bags',
						type: 'Hazardous',
						axis: 'waste:W-160110-Hazardous-ExplosiveComponentsForExampleAirBagsMember',
					},
					{
						code: '16 01 11',
						description: 'Brake pads containing asbestos',
						type: 'Hazardous',
						axis: 'waste:W-160111-Hazardous-BrakePadsContainingAsbestosMember',
					},
					{
						code: '16 01 12',
						description: 'Brake pads other than those mentioned in 16 01 11',
						type: 'Non-Hazardous',
						axis: 'waste:W-160112-Non-Hazardous-BrakePadsOtherThanThoseMentionedIn160111Member',
					},
					{
						code: '16 01 13',
						description: 'Brake fluids',
						type: 'Hazardous',
						axis: 'waste:W-160113-Hazardous-BrakeFluidsMember',
					},
					{
						code: '16 01 14',
						description: 'Antifreeze fluids containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-160114-Hazardous-AntifreezeFluidsContainingHazardousSubstancesMember',
					},
					{
						code: '16 01 15',
						description:
							'Antifreeze fluids other than those mentioned in 16 01 14',
						type: 'Non-Hazardous',
						axis: 'waste:W-160115-Non-Hazardous-AntifreezeFluidsOtherThanThoseMentionedIn160114Member',
					},
					{
						code: '16 01 16',
						description: 'Tanks for liquefied gas',
						type: 'Non-Hazardous',
						axis: 'waste:W-160116-Non-Hazardous-TanksForLiquefiedGasMember',
					},
					{
						code: '16 01 17',
						description: 'Ferrous metal',
						type: 'Non-Hazardous',
						axis: 'waste:W-160117-Non-Hazardous-FerrousMetalMember',
					},
					{
						code: '16 01 18',
						description: 'Non-ferrous metal',
						type: 'Non-Hazardous',
						axis: 'waste:W-160118-Non-Hazardous-Non-FerrousMetalMember',
					},
					{
						code: '16 01 19',
						description: 'Plastic',
						type: 'Non-Hazardous',
						axis: 'waste:W-160119-Non-Hazardous-PlasticMember',
					},
					{
						code: '16 01 20',
						description: 'Glass',
						type: 'Non-Hazardous',
						axis: 'waste:W-160120-Non-Hazardous-GlassMember',
					},
					{
						code: '16 01 21',
						description:
							'Hazardous components other than those mentioned in 16 01 07 to 16 01 11 and 16 01 13 and 16 01 14',
						type: 'Hazardous',
						axis: 'waste:W-160121-Hazardous-HazardousComponentsOtherThanThoseMentionedIn160107To160111And160113And160114Member',
					},
					{
						code: '16 01 22',
						description: 'Components not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-160122-Non-Hazardous-ComponentsNotOtherwiseSpecifiedMember',
					},
					{
						code: '16 01 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-160199-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Wastes from electrical and electronic equipment',
				codes: [
					{
						code: '16 02 09',
						description: 'Transformers and capacitors containing PCBs',
						type: 'Hazardous',
						axis: 'waste:W-160209-Hazardous-TransformersAndCapacitorsContainingPcbsMember',
					},
					{
						code: '16 02 10',
						description:
							'Discarded equipment containing or contaminated by PCBs other than those mentioned in 16 02 09',
						type: 'Hazardous',
						axis: 'waste:W-160210-Hazardous-DiscardedEquipmentContainingOrContaminatedByPcbsOtherThanThoseMentionedIn160209Member',
					},
					{
						code: '16 02 11',
						description:
							'Discarded equipment containing chlorofluorocarbons HCFC HFC',
						type: 'Hazardous',
						axis: 'waste:W-160211-Hazardous-DiscardedEquipmentContainingChlorofluorocarbonsHcfcHfcMember',
					},
					{
						code: '16 02 12',
						description: 'Discarded equipment containing free asbestos',
						type: 'Hazardous',
						axis: 'waste:W-160212-Hazardous-DiscardedEquipmentContainingFreeAsbestosMember',
					},
					{
						code: '16 02 13',
						description:
							'Discarded equipment containing hazardous components 3 other than those mentioned in 16 02 09 to 16 02 12',
						type: 'Hazardous',
						axis: 'waste:W-160213-Hazardous-DiscardedEquipmentContainingHazardousComponents3OtherThanThoseMentionedIn160209To160212Member',
					},
					{
						code: '16 02 14',
						description:
							'Discarded equipment other than those mentioned in 16 02 09 to 16 02 13',
						type: 'Non-Hazardous',
						axis: 'waste:W-160214-Non-Hazardous-DiscardedEquipmentOtherThanThoseMentionedIn160209To160213Member',
					},
					{
						code: '16 02 15',
						description:
							'Hazardous components removed from discarded equipment',
						type: 'Hazardous',
						axis: 'waste:W-160215-Hazardous-HazardousComponentsRemovedFromDiscardedEquipmentMember',
					},
					{
						code: '16 02 16',
						description:
							'Components removed from discarded equipment other than those mentioned in 16 02 15',
						type: 'Non-Hazardous',
						axis: 'waste:W-160216-Non-Hazardous-ComponentsRemovedFromDiscardedEquipmentOtherThanThoseMentionedIn160215Member',
					},
				],
			},
			{
				label: 'Off-specification batches and unused products',
				codes: [
					{
						code: '16 03 03',
						description: 'Inorganic wastes containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-160303-Hazardous-InorganicWastesContainingHazardousSubstancesMember',
					},
					{
						code: '16 03 04',
						description:
							'Inorganic wastes other than those mentioned in 16 03 03',
						type: 'Non-Hazardous',
						axis: 'waste:W-160304-Non-Hazardous-InorganicWastesOtherThanThoseMentionedIn160303Member',
					},
					{
						code: '16 03 05',
						description: 'Organic wastes containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-160305-Hazardous-OrganicWastesContainingHazardousSubstancesMember',
					},
					{
						code: '16 03 06',
						description:
							'Organic wastes other than those mentioned in 16 03 05',
						type: 'Non-Hazardous',
						axis: 'waste:W-160306-Non-Hazardous-OrganicWastesOtherThanThoseMentionedIn160305Member',
					},
					{
						code: '16 03 07',
						description: 'Metallic mercury',
						type: 'Hazardous',
						axis: 'waste:W-160307-Hazardous-MetallicMercuryMember',
					},
				],
			},
			{
				label: 'Waste explosives',
				codes: [
					{
						code: '16 04 01',
						description: 'Waste ammunition',
						type: 'Hazardous',
						axis: 'waste:W-160401-Hazardous-WasteAmmunitionMember',
					},
					{
						code: '16 04 02',
						description: 'Fireworks wastes',
						type: 'Hazardous',
						axis: 'waste:W-160402-Hazardous-FireworksWastesMember',
					},
					{
						code: '16 04 03',
						description: 'Other waste explosives',
						type: 'Hazardous',
						axis: 'waste:W-160403-Hazardous-OtherWasteExplosivesMember',
					},
				],
			},
			{
				label: 'Gases in pressure containers and discarded chemicals',
				codes: [
					{
						code: '16 05 04',
						description:
							'Gases in pressure containers including halons containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-160504-Hazardous-GasesInPressureContainersIncludingHalonsContainingHazardousSubstancesMember',
					},
					{
						code: '16 05 05',
						description:
							'Gases in pressure containers other than those mentioned in 16 05 04',
						type: 'Non-Hazardous',
						axis: 'waste:W-160505-Non-Hazardous-GasesInPressureContainersOtherThanThoseMentionedIn160504Member',
					},
					{
						code: '16 05 06',
						description:
							'Laboratory chemicals consisting of or containing hazardous substances including mixtures of laboratory chemicals',
						type: 'Hazardous',
						axis: 'waste:W-160506-Hazardous-LaboratoryChemicalsConsistingOfOrContainingHazardousSubstancesIncludingMixturesOfLaboratoryChemicalsMember',
					},
					{
						code: '16 05 07',
						description:
							'Discarded inorganic chemicals consisting of or containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-160507-Hazardous-DiscardedInorganicChemicalsConsistingOfOrContainingHazardousSubstancesMember',
					},
					{
						code: '16 05 08',
						description:
							'Discarded organic chemicals consisting of or containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-160508-Hazardous-DiscardedOrganicChemicalsConsistingOfOrContainingHazardousSubstancesMember',
					},
					{
						code: '16 05 09',
						description:
							'Discarded chemicals other than those mentioned in 16 05 06 16 05 07 or 16 05 08',
						type: 'Non-Hazardous',
						axis: 'waste:W-160509-Non-Hazardous-DiscardedChemicalsOtherThanThoseMentionedIn160506160507Or160508Member',
					},
				],
			},
			{
				label: 'Batteries and accumulators',
				codes: [
					{
						code: '16 06 01',
						description: 'Lead batteries',
						type: 'Hazardous',
						axis: 'waste:W-160601-Hazardous-LeadBatteriesMember',
					},
					{
						code: '16 06 02',
						description: 'Ni cd batteries',
						type: 'Hazardous',
						axis: 'waste:W-160602-Hazardous-Ni-CdBatteriesMember',
					},
					{
						code: '16 06 03',
						description: 'Mercury-containing batteries',
						type: 'Hazardous',
						axis: 'waste:W-160603-Hazardous-Mercury-ContainingBatteriesMember',
					},
					{
						code: '16 06 04',
						description: 'Alkaline batteries except 16 06 03',
						type: 'Non-Hazardous',
						axis: 'waste:W-160604-Non-Hazardous-AlkalineBatteriesExcept160603Member',
					},
					{
						code: '16 06 05',
						description: 'Other batteries and accumulators',
						type: 'Non-Hazardous',
						axis: 'waste:W-160605-Non-Hazardous-OtherBatteriesAndAccumulatorsMember',
					},
					{
						code: '16 06 06',
						description:
							'Separately collected electrolyte from batteries and accumulators',
						type: 'Hazardous',
						axis: 'waste:W-160606-Hazardous-SeparatelyCollectedElectrolyteFromBatteriesAndAccumulatorsMember',
					},
				],
			},
			{
				label:
					'Wastes from transport tank storage tank and barrel cleaning except 05 and 13',
				codes: [
					{
						code: '16 07 08',
						description: 'Wastes containing oil',
						type: 'Hazardous',
						axis: 'waste:W-160708-Hazardous-WastesContainingOilMember',
					},
					{
						code: '16 07 09',
						description: 'Wastes containing other hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-160709-Hazardous-WastesContainingOtherHazardousSubstancesMember',
					},
					{
						code: '16 07 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-160799-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Spent catalysts',
				codes: [
					{
						code: '16 08 01',
						description:
							'Spent catalysts containing gold silver rhenium rhodium palladium iridium or platinum except 16 08 07',
						type: 'Non-Hazardous',
						axis: 'waste:W-160801-Non-Hazardous-SpentCatalystsContainingGoldSilverRheniumRhodiumPalladiumIridiumOrPlatinumExcept160807Member',
					},
					{
						code: '16 08 02',
						description:
							'Spent catalysts containing hazardous transition metals or hazardous transition metal compounds',
						type: 'Hazardous',
						axis: 'waste:W-160802-Hazardous-SpentCatalystsContainingHazardousTransitionMetalsOrHazardousTransitionMetalCompoundsMember',
					},
					{
						code: '16 08 03',
						description:
							'Spent catalysts containing transition metals or transition metal compounds not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-160803-Non-Hazardous-SpentCatalystsContainingTransitionMetalsOrTransitionMetalCompoundsNotOtherwiseSpecifiedMember',
					},
					{
						code: '16 08 04',
						description:
							'Spent fluid catalytic cracking catalysts except 16 08 07',
						type: 'Non-Hazardous',
						axis: 'waste:W-160804-Non-Hazardous-SpentFluidCatalyticCrackingCatalystsExcept160807Member',
					},
					{
						code: '16 08 05',
						description: 'Spent catalysts containing phosphoric acid',
						type: 'Hazardous',
						axis: 'waste:W-160805-Hazardous-SpentCatalystsContainingPhosphoricAcidMember',
					},
					{
						code: '16 08 06',
						description: 'Spent liquids used as catalysts',
						type: 'Hazardous',
						axis: 'waste:W-160806-Hazardous-SpentLiquidsUsedAsCatalystsMember',
					},
					{
						code: '16 08 07',
						description:
							'Spent catalysts contaminated with hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-160807-Hazardous-SpentCatalystsContaminatedWithHazardousSubstancesMember',
					},
				],
			},
			{
				label: 'Oxidising substances',
				codes: [
					{
						code: '16 09 01',
						description: 'Permanganates for example potassium permanganate',
						type: 'Hazardous',
						axis: 'waste:W-160901-Hazardous-PermanganatesForExamplePotassiumPermanganateMember',
					},
					{
						code: '16 09 02',
						description:
							'Chromates for example potassium chromate potassium or sodium dichromate',
						type: 'Hazardous',
						axis: 'waste:W-160902-Hazardous-ChromatesForExamplePotassiumChromatePotassiumOrSodiumDichromateMember',
					},
					{
						code: '16 09 03',
						description: 'Peroxides for example hydrogen peroxide',
						type: 'Hazardous',
						axis: 'waste:W-160903-Hazardous-PeroxidesForExampleHydrogenPeroxideMember',
					},
					{
						code: '16 09 04',
						description: 'Oxidising substances not otherwise specified',
						type: 'Hazardous',
						axis: 'waste:W-160904-Hazardous-OxidisingSubstancesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Aqueous liquid wastes destined for off-site treatment',
				codes: [
					{
						code: '16 10 01',
						description:
							'Aqueous liquid wastes containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-161001-Hazardous-AqueousLiquidWastesContainingHazardousSubstancesMember',
					},
					{
						code: '16 10 02',
						description:
							'Aqueous liquid wastes other than those mentioned in 16 10 01',
						type: 'Non-Hazardous',
						axis: 'waste:W-161002-Non-Hazardous-AqueousLiquidWastesOtherThanThoseMentionedIn161001Member',
					},
					{
						code: '16 10 03',
						description: 'Aqueous concentrates containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-161003-Hazardous-AqueousConcentratesContainingHazardousSubstancesMember',
					},
					{
						code: '16 10 04',
						description:
							'Aqueous concentrates other than those mentioned in 16 10 03',
						type: 'Non-Hazardous',
						axis: 'waste:W-161004-Non-Hazardous-AqueousConcentratesOtherThanThoseMentionedIn161003Member',
					},
				],
			},
			{
				label: 'Waste linings and refractories',
				codes: [
					{
						code: '16 11 01',
						description:
							'Carbon-based linings and refractories from metallurgical processes containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-161101-Hazardous-Carbon-BasedLiningsAndRefractoriesFromMetallurgicalProcessesContainingHazardousSubstancesMember',
					},
					{
						code: '16 11 02',
						description:
							'Carbon-based linings and refractories from metallurgical processes others than those mentioned in 16 11 01',
						type: 'Non-Hazardous',
						axis: 'waste:W-161102-Non-Hazardous-Carbon-BasedLiningsAndRefractoriesFromMetallurgicalProcessesOthersThanThoseMentionedIn161101Member',
					},
					{
						code: '16 11 03',
						description:
							'Other linings and refractories from metallurgical processes containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-161103-Hazardous-OtherLiningsAndRefractoriesFromMetallurgicalProcessesContainingHazardousSubstancesMember',
					},
					{
						code: '16 11 04',
						description:
							'Other linings and refractories from metallurgical processes other than those mentioned in 16 11 03',
						type: 'Non-Hazardous',
						axis: 'waste:W-161104-Non-Hazardous-OtherLiningsAndRefractoriesFromMetallurgicalProcessesOtherThanThoseMentionedIn161103Member',
					},
					{
						code: '16 11 05',
						description:
							'Linings and refractories from non-metallurgical processes containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-161105-Hazardous-LiningsAndRefractoriesFromNon-MetallurgicalProcessesContainingHazardousSubstancesMember',
					},
					{
						code: '16 11 06',
						description:
							'Linings and refractories from non-metallurgical processes others than those mentioned in 16 11 05',
						type: 'Non-Hazardous',
						axis: 'waste:W-161106-Non-Hazardous-LiningsAndRefractoriesFromNon-MetallurgicalProcessesOthersThanThoseMentionedIn161105Member',
					},
				],
			},
		],
	},
	{
		id: 17,
		label:
			'CONSTRUCTION AND DEMOLITION WASTES (INCLUDING EXCAVATED SOIL FROM CONTAMINATED SITES)',
		subcategories: [
			{
				label: 'Concrete, bricks, tiles and ceramics',
				codes: [
					{
						code: '17 01 01',
						description: 'Concrete',
						type: 'Non-Hazardous',
						axis: 'waste:W-170101-Non-Hazardous-ConcreteMember',
					},
					{
						code: '17 01 02',
						description: 'Bricks',
						type: 'Non-Hazardous',
						axis: 'waste:W-170102-Non-Hazardous-BricksMember',
					},
					{
						code: '17 01 03',
						description: 'Tiles and ceramics',
						type: 'Non-Hazardous',
						axis: 'waste:W-170103-Non-Hazardous-TilesAndCeramicsMember',
					},
					{
						code: '17 01 06',
						description:
							'Mixtures of or separate fractions of concrete bricks tiles and ceramics containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-170106-Hazardous-MixturesOfOrSeparateFractionsOfConcreteBricksTilesAndCeramicsContainingHazardousSubstancesMember',
					},
					{
						code: '17 01 07',
						description:
							'Mixtures of concrete bricks tiles and ceramics other than those mentioned in 17 01 06',
						type: 'Non-Hazardous',
						axis: 'waste:W-170107-Non-Hazardous-MixturesOfConcreteBricksTilesAndCeramicsOtherThanThoseMentionedIn170106Member',
					},
				],
			},
			{
				label: 'Wood, glass and plastic',
				codes: [
					{
						code: '17 02 01',
						description: 'Wood',
						type: 'Non-Hazardous',
						axis: 'waste:W-170201-Non-Hazardous-WoodMember',
					},
					{
						code: '17 02 02',
						description: 'Glass',
						type: 'Non-Hazardous',
						axis: 'waste:W-170202-Non-Hazardous-GlassMember',
					},
					{
						code: '17 02 03',
						description: 'Plastic',
						type: 'Non-Hazardous',
						axis: 'waste:W-170203-Non-Hazardous-PlasticMember',
					},
					{
						code: '17 02 04',
						description:
							'Glass plastic and wood containing or contaminated with hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-170204-Hazardous-GlassPlasticAndWoodContainingOrContaminatedWithHazardousSubstancesMember',
					},
				],
			},
			{
				label: 'Bituminous mixtures, coal tar and tarred products',
				codes: [
					{
						code: '17 03 01',
						description: 'Bituminous mixtures containing coal tar',
						type: 'Hazardous',
						axis: 'waste:W-170301-Hazardous-BituminousMixturesContainingCoalTarMember',
					},
					{
						code: '17 03 02',
						description:
							'Bituminous mixtures other than those mentioned in 17 03 01',
						type: 'Non-Hazardous',
						axis: 'waste:W-170302-Non-Hazardous-BituminousMixturesOtherThanThoseMentionedIn170301Member',
					},
					{
						code: '17 03 03',
						description: 'Coal tar and tarred products',
						type: 'Hazardous',
						axis: 'waste:W-170303-Hazardous-CoalTarAndTarredProductsMember',
					},
				],
			},
			{
				label: 'Metals (including their alloys)',
				codes: [
					{
						code: '17 04 01',
						description: 'Copper bronze brass',
						type: 'Non-Hazardous',
						axis: 'waste:W-170401-Non-Hazardous-CopperBronzeBrassMember',
					},
					{
						code: '17 04 02',
						description: 'Aluminium',
						type: 'Non-Hazardous',
						axis: 'waste:W-170402-Non-Hazardous-AluminiumMember',
					},
					{
						code: '17 04 03',
						description: 'Lead',
						type: 'Non-Hazardous',
						axis: 'waste:W-170403-Non-Hazardous-LeadMember',
					},
					{
						code: '17 04 04',
						description: 'Zinc',
						type: 'Non-Hazardous',
						axis: 'waste:W-170404-Non-Hazardous-ZincMember',
					},
					{
						code: '17 04 05',
						description: 'Iron and steel',
						type: 'Non-Hazardous',
						axis: 'waste:W-170405-Non-Hazardous-IronAndSteelMember',
					},
					{
						code: '17 04 06',
						description: 'Tin',
						type: 'Non-Hazardous',
						axis: 'waste:W-170406-Non-Hazardous-TinMember',
					},
					{
						code: '17 04 07',
						description: 'Mixed metals',
						type: 'Non-Hazardous',
						axis: 'waste:W-170407-Non-Hazardous-MixedMetalsMember',
					},
					{
						code: '17 04 09',
						description: 'Metal waste contaminated with hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-170409-Hazardous-MetalWasteContaminatedWithHazardousSubstancesMember',
					},
					{
						code: '17 04 10',
						description:
							'Cables containing oil coal tar and other hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-170410-Hazardous-CablesContainingOilCoalTarAndOtherHazardousSubstancesMember',
					},
					{
						code: '17 04 11',
						description: 'Cables other than those mentioned in 17 04 10',
						type: 'Non-Hazardous',
						axis: 'waste:W-170411-Non-Hazardous-CablesOtherThanThoseMentionedIn170410Member',
					},
				],
			},
			{
				label:
					'Soil including excavated soil from contaminated sites stones and dredging spoil',
				codes: [
					{
						code: '17 05 03',
						description: 'Soil and stones containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-170503-Hazardous-SoilAndStonesContainingHazardousSubstancesMember',
					},
					{
						code: '17 05 04',
						description:
							'Soil and stones other than those mentioned in 17 05 03',
						type: 'Non-Hazardous',
						axis: 'waste:W-170504-Non-Hazardous-SoilAndStonesOtherThanThoseMentionedIn170503Member',
					},
					{
						code: '17 05 05',
						description: 'Dredging spoil containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-170505-Hazardous-DredgingSpoilContainingHazardousSubstancesMember',
					},
					{
						code: '17 05 06',
						description:
							'Dredging spoil other than those mentioned in 17 05 05',
						type: 'Non-Hazardous',
						axis: 'waste:W-170506-Non-Hazardous-DredgingSpoilOtherThanThoseMentionedIn170505Member',
					},
					{
						code: '17 05 07',
						description: 'Track ballast containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-170507-Hazardous-TrackBallastContainingHazardousSubstancesMember',
					},
					{
						code: '17 05 08',
						description: 'Track ballast other than those mentioned in 17 05 07',
						type: 'Non-Hazardous',
						axis: 'waste:W-170508-Non-Hazardous-TrackBallastOtherThanThoseMentionedIn170507Member',
					},
				],
			},
			{
				label:
					'Insulation materials and asbestos-containing construction materials',
				codes: [
					{
						code: '17 06 01',
						description: 'Insulation materials containing asbestos',
						type: 'Hazardous',
						axis: 'waste:W-170601-Hazardous-InsulationMaterialsContainingAsbestosMember',
					},
					{
						code: '17 06 03',
						description:
							'Other insulation materials consisting of or containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-170603-Hazardous-OtherInsulationMaterialsConsistingOfOrContainingHazardousSubstancesMember',
					},
					{
						code: '17 06 04',
						description:
							'Insulation materials other than those mentioned in 17 06 01 and 17 06 03',
						type: 'Non-Hazardous',
						axis: 'waste:W-170604-Non-Hazardous-InsulationMaterialsOtherThanThoseMentionedIn170601And170603Member',
					},
					{
						code: '17 06 05',
						description: 'Construction materials containing asbestos',
						type: 'Hazardous',
						axis: 'waste:W-170605-Hazardous-ConstructionMaterialsContainingAsbestosMember',
					},
				],
			},
			{
				label: 'Gypsum-based construction material',
				codes: [
					{
						code: '17 08 01',
						description:
							'Gypsum-based construction materials contaminated with hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-170801-Hazardous-Gypsum-BasedConstructionMaterialsContaminatedWithHazardousSubstancesMember',
					},
					{
						code: '17 08 02',
						description:
							'Gypsum-based construction materials other than those mentioned in 17 08 01',
						type: 'Non-Hazardous',
						axis: 'waste:W-170802-Non-Hazardous-Gypsum-BasedConstructionMaterialsOtherThanThoseMentionedIn170801Member',
					},
				],
			},
			{
				label: 'Other construction and demolition wastes',
				codes: [
					{
						code: '17 09 01',
						description:
							'Construction and demolition wastes containing mercury',
						type: 'Hazardous',
						axis: 'waste:W-170901-Hazardous-ConstructionAndDemolitionWastesContainingMercuryMember',
					},
					{
						code: '17 09 02',
						description:
							'Construction and demolition wastes containing PCB for example pcb-containing sealants pcb-containing resin-based floorings pcb-containing sealed glazing units pcb-containing capacitors',
						type: 'Hazardous',
						axis: 'waste:W-170902-Hazardous-ConstructionAndDemolitionWastesContainingPcbForExamplePcb-ContainingSealantsPcb-ContainingResin-BasedFlooringsPcb-ContainingSealedGlazingUnitsPcb-ContainingCapacitorsMember',
					},
					{
						code: '17 09 03',
						description:
							'Other construction and demolition wastes including mixed wastes containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-170903-Hazardous-OtherConstructionAndDemolitionWastesIncludingMixedWastesContainingHazardousSubstancesMember',
					},
					{
						code: '17 09 04',
						description:
							'Mixed construction and demolition wastes other than those mentioned in 17 09 01 17 09 02 and 17 09 03',
						type: 'Non-Hazardous',
						axis: 'waste:W-170904-Non-Hazardous-MixedConstructionAndDemolitionWastesOtherThanThoseMentionedIn170901170902And170903Member',
					},
				],
			},
		],
	},
	{
		id: 18,
		label:
			'WASTES FROM HUMAN OR ANIMAL HEALTH CARE AND OR RELATED RESEARCH EXCEPT KITCHEN AND RESTAURANT WASTES NOT ARISING FROM IMMEDIATE HEALTH CARE',
		subcategories: [
			{
				label:
					'Wastes from natal care, diagnosis, treatment or prevention of disease in humans',
				codes: [
					{
						code: '18 01 01',
						description: 'Sharps except 18 01 03',
						type: 'Non-Hazardous',
						axis: 'waste:W-180101-Non-Hazardous-SharpsExcept180103Member',
					},
					{
						code: '18 01 02',
						description:
							'Body parts and organs including blood bags and blood preserves except 18 01 03',
						type: 'Non-Hazardous',
						axis: 'waste:W-180102-Non-Hazardous-BodyPartsAndOrgansIncludingBloodBagsAndBloodPreservesExcept180103Member',
					},
					{
						code: '18 01 03',
						description:
							'Wastes whose collection and disposal is subject to special requirements in order to prevent infection',
						type: 'Hazardous',
						axis: 'waste:W-180103-Hazardous-WastesWhoseCollectionAndDisposalIsSubjectToSpecialRequirementsInOrderToPreventInfectionMember',
					},
					{
						code: '18 01 04',
						description:
							'Wastes whose collection and disposal is not subject to special requirements in order to prevent infection for example dressings plaster casts linen disposable clothing diapers',
						type: 'Non-Hazardous',
						axis: 'waste:W-180104-Non-Hazardous-WastesWhoseCollectionAndDisposalIsNotSubjectToSpecialRequirementsInOrderToPreventInfectionForExampleDressingsPlasterCastsLinenDisposableClothingDiapersMember',
					},
					{
						code: '18 01 06',
						description:
							'Chemicals consisting of or containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-180106-Hazardous-ChemicalsConsistingOfOrContainingHazardousSubstancesMember',
					},
					{
						code: '18 01 07',
						description: 'Chemicals other than those mentioned in 18 01 06',
						type: 'Non-Hazardous',
						axis: 'waste:W-180107-Non-Hazardous-ChemicalsOtherThanThoseMentionedIn180106Member',
					},
					{
						code: '18 01 08',
						description: 'Cytotoxic and cytostatic medicines',
						type: 'Hazardous',
						axis: 'waste:W-180108-Hazardous-CytotoxicAndCytostaticMedicinesMember',
					},
					{
						code: '18 01 09',
						description: 'Medicines other than those mentioned in 18 01 08',
						type: 'Non-Hazardous',
						axis: 'waste:W-180109-Non-Hazardous-MedicinesOtherThanThoseMentionedIn180108Member',
					},
					{
						code: '18 01 10',
						description: 'Amalgam waste from dental care',
						type: 'Hazardous',
						axis: 'waste:W-180110-Hazardous-AmalgamWasteFromDentalCareMember',
					},
				],
			},
			{
				label:
					'Wastes from research, diagnosis, treatment or prevention of disease involving animals',
				codes: [
					{
						code: '18 02 01',
						description: 'Sharps except 18 02 02',
						type: 'Non-Hazardous',
						axis: 'waste:W-180201-Non-Hazardous-SharpsExcept180202Member',
					},
					{
						code: '18 02 02',
						description:
							'Wastes whose collection and disposal is subject to special requirements in order to prevent infection',
						type: 'Hazardous',
						axis: 'waste:W-180202-Hazardous-WastesWhoseCollectionAndDisposalIsSubjectToSpecialRequirementsInOrderToPreventInfectionMember',
					},
					{
						code: '18 02 03',
						description:
							'Wastes whose collection and disposal is not subject to special requirements in order to prevent infection',
						type: 'Non-Hazardous',
						axis: 'waste:W-180203-Non-Hazardous-WastesWhoseCollectionAndDisposalIsNotSubjectToSpecialRequirementsInOrderToPreventInfectionMember',
					},
					{
						code: '18 02 05',
						description:
							'Chemicals consisting of or containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-180205-Hazardous-ChemicalsConsistingOfOrContainingHazardousSubstancesMember',
					},
					{
						code: '18 02 06',
						description: 'Chemicals other than those mentioned in 18 02 05',
						type: 'Non-Hazardous',
						axis: 'waste:W-180206-Non-Hazardous-ChemicalsOtherThanThoseMentionedIn180205Member',
					},
					{
						code: '18 02 07',
						description: 'Cytotoxic and cytostatic medicines',
						type: 'Hazardous',
						axis: 'waste:W-180207-Hazardous-CytotoxicAndCytostaticMedicinesMember',
					},
					{
						code: '18 02 08',
						description: 'Medicines other than those mentioned in 18 02 07',
						type: 'Non-Hazardous',
						axis: 'waste:W-180208-Non-Hazardous-MedicinesOtherThanThoseMentionedIn180207Member',
					},
				],
			},
		],
	},
	{
		id: 19,
		label:
			'WASTES FROM WASTE MANAGEMENT FACILITIES OFF-SITE WASTE WATER TREATMENT PLANTS AND THE PREPARATION OF WATER INTENDED FOR HUMAN CONSUMPTION AND WATER FOR INDUSTRIAL USE',
		subcategories: [
			{
				label: 'Wastes from incineration or pyrolysis of waste',
				codes: [
					{
						code: '19 01 02',
						description: 'Ferrous materials removed from bottom ash',
						type: 'Non-Hazardous',
						axis: 'waste:W-190102-Non-Hazardous-FerrousMaterialsRemovedFromBottomAshMember',
					},
					{
						code: '19 01 05',
						description: 'Filter cake from gas treatment',
						type: 'Hazardous',
						axis: 'waste:W-190105-Hazardous-FilterCakeFromGasTreatmentMember',
					},
					{
						code: '19 01 06',
						description:
							'Aqueous liquid wastes from gas treatment and other aqueous liquid wastes',
						type: 'Hazardous',
						axis: 'waste:W-190106-Hazardous-AqueousLiquidWastesFromGasTreatmentAndOtherAqueousLiquidWastesMember',
					},
					{
						code: '19 01 07',
						description: 'Solid wastes from gas treatment',
						type: 'Hazardous',
						axis: 'waste:W-190107-Hazardous-SolidWastesFromGasTreatmentMember',
					},
					{
						code: '19 01 10',
						description: 'Spent activated carbon from flue-gas treatment',
						type: 'Hazardous',
						axis: 'waste:W-190110-Hazardous-SpentActivatedCarbonFromFlue-GasTreatmentMember',
					},
					{
						code: '19 01 11',
						description: 'Bottom ash and slag containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-190111-Hazardous-BottomAshAndSlagContainingHazardousSubstancesMember',
					},
					{
						code: '19 01 12',
						description:
							'Bottom ash and slag other than those mentioned in 19 01 11',
						type: 'Non-Hazardous',
						axis: 'waste:W-190112-Non-Hazardous-BottomAshAndSlagOtherThanThoseMentionedIn190111Member',
					},
					{
						code: '19 01 13',
						description: 'Fly ash containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-190113-Hazardous-FlyAshContainingHazardousSubstancesMember',
					},
					{
						code: '19 01 14',
						description: 'Fly ash other than those mentioned in 19 01 13',
						type: 'Non-Hazardous',
						axis: 'waste:W-190114-Non-Hazardous-FlyAshOtherThanThoseMentionedIn190113Member',
					},
					{
						code: '19 01 15',
						description: 'Boiler dust containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-190115-Hazardous-BoilerDustContainingHazardousSubstancesMember',
					},
					{
						code: '19 01 16',
						description: 'Boiler dust other than those mentioned in 19 01 15',
						type: 'Non-Hazardous',
						axis: 'waste:W-190116-Non-Hazardous-BoilerDustOtherThanThoseMentionedIn190115Member',
					},
					{
						code: '19 01 17',
						description: 'Pyrolysis wastes containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-190117-Hazardous-PyrolysisWastesContainingHazardousSubstancesMember',
					},
					{
						code: '19 01 18',
						description:
							'Pyrolysis wastes other than those mentioned in 19 01 17',
						type: 'Non-Hazardous',
						axis: 'waste:W-190118-Non-Hazardous-PyrolysisWastesOtherThanThoseMentionedIn190117Member',
					},
					{
						code: '19 01 19',
						description: 'Sands from fluidised beds',
						type: 'Non-Hazardous',
						axis: 'waste:W-190119-Non-Hazardous-SandsFromFluidisedBedsMember',
					},
					{
						code: '19 01 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-190199-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label:
					'Wastes from physico chemical treatments of waste including dechromatation decyanidation neutralisation',
				codes: [
					{
						code: '19 02 03',
						description:
							'Premixed wastes composed only of non-hazardous wastes',
						type: 'Non-Hazardous',
						axis: 'waste:W-190203-Non-Hazardous-PremixedWastesComposedOnlyOfNon-HazardousWastesMember',
					},
					{
						code: '19 02 04',
						description:
							'Premixed wastes composed of at least one hazardous waste',
						type: 'Hazardous',
						axis: 'waste:W-190204-Hazardous-PremixedWastesComposedOfAtLeastOneHazardousWasteMember',
					},
					{
						code: '19 02 05',
						description:
							'Sludges from physico chemical treatment containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-190205-Hazardous-SludgesFromPhysicoChemicalTreatmentContainingHazardousSubstancesMember',
					},
					{
						code: '19 02 06',
						description:
							'Sludges from physico chemical treatment other than those mentioned in 19 02 05',
						type: 'Non-Hazardous',
						axis: 'waste:W-190206-Non-Hazardous-SludgesFromPhysicoChemicalTreatmentOtherThanThoseMentionedIn190205Member',
					},
					{
						code: '19 02 07',
						description: 'Oil and concentrates from separation',
						type: 'Hazardous',
						axis: 'waste:W-190207-Hazardous-OilAndConcentratesFromSeparationMember',
					},
					{
						code: '19 02 08',
						description:
							'Liquid combustible wastes containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-190208-Hazardous-LiquidCombustibleWastesContainingHazardousSubstancesMember',
					},
					{
						code: '19 02 09',
						description:
							'Solid combustible wastes containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-190209-Hazardous-SolidCombustibleWastesContainingHazardousSubstancesMember',
					},
					{
						code: '19 02 10',
						description:
							'Combustible wastes other than those mentioned in 19 02 08 and 19 02 09',
						type: 'Non-Hazardous',
						axis: 'waste:W-190210-Non-Hazardous-CombustibleWastesOtherThanThoseMentionedIn190208And190209Member',
					},
					{
						code: '19 02 11',
						description: 'Other wastes containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-190211-Hazardous-OtherWastesContainingHazardousSubstancesMember',
					},
					{
						code: '19 02 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-190299-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Stabilised solidified wastes',
				codes: [
					{
						code: '19 03 04',
						description:
							'Wastes marked as hazardous partly stabilised other than 19 03 08',
						type: 'Hazardous',
						axis: 'waste:W-190304-Hazardous-WastesMarkedAsHazardousPartlyStabilisedOtherThan190308Member',
					},
					{
						code: '19 03 05',
						description:
							'Stabilised wastes other than those mentioned in 19 03 04',
						type: 'Non-Hazardous',
						axis: 'waste:W-190305-Non-Hazardous-StabilisedWastesOtherThanThoseMentionedIn190304Member',
					},
					{
						code: '19 03 06',
						description: 'Wastes marked as hazardous solidified',
						type: 'Hazardous',
						axis: 'waste:W-190306-Hazardous-WastesMarkedAsHazardousSolidifiedMember',
					},
					{
						code: '19 03 07',
						description:
							'Solidified wastes other than those mentioned in 19 03 06',
						type: 'Non-Hazardous',
						axis: 'waste:W-190307-Non-Hazardous-SolidifiedWastesOtherThanThoseMentionedIn190306Member',
					},
					{
						code: '19 03 08',
						description: 'Partly stabilised mercury',
						type: 'Hazardous',
						axis: 'waste:W-190308-Hazardous-PartlyStabilisedMercuryMember',
					},
				],
			},
			{
				label: 'Vitrified waste and wastes from vitrification',
				codes: [
					{
						code: '19 04 01',
						description: 'Vitrified waste',
						type: 'Non-Hazardous',
						axis: 'waste:W-190401-Non-Hazardous-VitrifiedWasteMember',
					},
					{
						code: '19 04 02',
						description: 'Fly ash and other flue-gas treatment wastes',
						type: 'Hazardous',
						axis: 'waste:W-190402-Hazardous-FlyAshAndOtherFlue-GasTreatmentWastesMember',
					},
					{
						code: '19 04 03',
						description: 'Non-vitrified solid phase',
						type: 'Hazardous',
						axis: 'waste:W-190403-Hazardous-Non-VitrifiedSolidPhaseMember',
					},
					{
						code: '19 04 04',
						description: 'Aqueous liquid wastes from vitrified waste tempering',
						type: 'Non-Hazardous',
						axis: 'waste:W-190404-Non-Hazardous-AqueousLiquidWastesFromVitrifiedWasteTemperingMember',
					},
				],
			},
			{
				label: 'Wastes from aerobic treatment of solid wastes',
				codes: [
					{
						code: '19 05 01',
						description:
							'Non-composted fraction of municipal and similar wastes',
						type: 'Non-Hazardous',
						axis: 'waste:W-190501-Non-Hazardous-Non-CompostedFractionOfMunicipalAndSimilarWastesMember',
					},
					{
						code: '19 05 02',
						description: 'Non-composted fraction of animal and vegetable waste',
						type: 'Non-Hazardous',
						axis: 'waste:W-190502-Non-Hazardous-Non-CompostedFractionOfAnimalAndVegetableWasteMember',
					},
					{
						code: '19 05 03',
						description: 'Off-specification compost',
						type: 'Non-Hazardous',
						axis: 'waste:W-190503-Non-Hazardous-Off-SpecificationCompostMember',
					},
					{
						code: '19 05 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-190599-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Wastes from anaerobic treatment of waste',
				codes: [
					{
						code: '19 06 03',
						description: 'Liquor from anaerobic treatment of municipal waste',
						type: 'Non-Hazardous',
						axis: 'waste:W-190603-Non-Hazardous-LiquorFromAnaerobicTreatmentOfMunicipalWasteMember',
					},
					{
						code: '19 06 04',
						description:
							'Digestate from anaerobic treatment of municipal waste',
						type: 'Non-Hazardous',
						axis: 'waste:W-190604-Non-Hazardous-DigestateFromAnaerobicTreatmentOfMunicipalWasteMember',
					},
					{
						code: '19 06 05',
						description:
							'Liquor from anaerobic treatment of animal and vegetable waste',
						type: 'Non-Hazardous',
						axis: 'waste:W-190605-Non-Hazardous-LiquorFromAnaerobicTreatmentOfAnimalAndVegetableWasteMember',
					},
					{
						code: '19 06 06',
						description:
							'Digestate from anaerobic treatment of animal and vegetable waste',
						type: 'Non-Hazardous',
						axis: 'waste:W-190606-Non-Hazardous-DigestateFromAnaerobicTreatmentOfAnimalAndVegetableWasteMember',
					},
					{
						code: '19 06 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-190699-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Landfill leachate',
				codes: [
					{
						code: '19 07 02',
						description: 'Landfill leachate containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-190702-Hazardous-LandfillLeachateContainingHazardousSubstancesMember',
					},
					{
						code: '19 07 03',
						description:
							'Landfill leachate other than those mentioned in 19 07 02',
						type: 'Non-Hazardous',
						axis: 'waste:W-190703-Non-Hazardous-LandfillLeachateOtherThanThoseMentionedIn190702Member',
					},
				],
			},
			{
				label:
					'Wastes from waste water treatment plants not otherwise specified',
				codes: [
					{
						code: '19 08 01',
						description: 'Screenings',
						type: 'Non-Hazardous',
						axis: 'waste:W-190801-Non-Hazardous-ScreeningsMember',
					},
					{
						code: '19 08 02',
						description: 'Waste from desanding',
						type: 'Non-Hazardous',
						axis: 'waste:W-190802-Non-Hazardous-WasteFromDesandingMember',
					},
					{
						code: '19 08 05',
						description: 'Sludges from treatment of urban waste water',
						type: 'Non-Hazardous',
						axis: 'waste:W-190805-Non-Hazardous-SludgesFromTreatmentOfUrbanWasteWaterMember',
					},
					{
						code: '19 08 06',
						description: 'Saturated or spent ion exchange resins',
						type: 'Hazardous',
						axis: 'waste:W-190806-Hazardous-SaturatedOrSpentIonExchangeResinsMember',
					},
					{
						code: '19 08 07',
						description:
							'Solutions and sludges from regeneration of ion exchangers',
						type: 'Hazardous',
						axis: 'waste:W-190807-Hazardous-SolutionsAndSludgesFromRegenerationOfIonExchangersMember',
					},
					{
						code: '19 08 08',
						description: 'Membrane system waste containing heavy metals',
						type: 'Hazardous',
						axis: 'waste:W-190808-Hazardous-MembraneSystemWasteContainingHeavyMetalsMember',
					},
					{
						code: '19 08 09',
						description:
							'Grease and oil mixture from oil/water separation containing only edible oil and fats',
						type: 'Non-Hazardous',
						axis: 'waste:W-190809-Non-Hazardous-GreaseAndOilMixtureFromOilWaterSeparationContainingOnlyEdibleOilAndFatsMember',
					},
					{
						code: '19 08 10',
						description:
							'Grease and oil mixture from oil/water separation other than those mentioned in 19 08 09',
						type: 'Hazardous',
						axis: 'waste:W-190810-Hazardous-GreaseAndOilMixtureFromOilWaterSeparationOtherThanThoseMentionedIn190809Member',
					},
					{
						code: '19 08 11',
						description:
							'Sludges containing hazardous substances from biological treatment of industrial waste water',
						type: 'Hazardous',
						axis: 'waste:W-190811-Hazardous-SludgesContainingHazardousSubstancesFromBiologicalTreatmentOfIndustrialWasteWaterMember',
					},
					{
						code: '19 08 12',
						description:
							'Sludges from biological treatment of industrial waste water other than those mentioned in 19 08 11',
						type: 'Non-Hazardous',
						axis: 'waste:W-190812-Non-Hazardous-SludgesFromBiologicalTreatmentOfIndustrialWasteWaterOtherThanThoseMentionedIn190811Member',
					},
					{
						code: '19 08 13',
						description:
							'Sludges containing hazardous substances from other treatment of industrial waste water',
						type: 'Hazardous',
						axis: 'waste:W-190813-Hazardous-SludgesContainingHazardousSubstancesFromOtherTreatmentOfIndustrialWasteWaterMember',
					},
					{
						code: '19 08 14',
						description:
							'Sludges from other treatment of industrial waste water other than those mentioned in 19 08 13',
						type: 'Non-Hazardous',
						axis: 'waste:W-190814-Non-Hazardous-SludgesFromOtherTreatmentOfIndustrialWasteWaterOtherThanThoseMentionedIn190813Member',
					},
					{
						code: '19 08 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-190899-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label:
					'Wastes from the preparation of water intended for human consumption or water for industrial use',
				codes: [
					{
						code: '19 09 01',
						description: 'Solid waste from primary filtration and screenings',
						type: 'Non-Hazardous',
						axis: 'waste:W-190901-Non-Hazardous-SolidWasteFromPrimaryFiltrationAndScreeningsMember',
					},
					{
						code: '19 09 02',
						description: 'Sludges from water clarification',
						type: 'Non-Hazardous',
						axis: 'waste:W-190902-Non-Hazardous-SludgesFromWaterClarificationMember',
					},
					{
						code: '19 09 03',
						description: 'Sludges from decarbonation',
						type: 'Non-Hazardous',
						axis: 'waste:W-190903-Non-Hazardous-SludgesFromDecarbonationMember',
					},
					{
						code: '19 09 04',
						description: 'Spent activated carbon',
						type: 'Non-Hazardous',
						axis: 'waste:W-190904-Non-Hazardous-SpentActivatedCarbonMember',
					},
					{
						code: '19 09 05',
						description: 'Saturated or spent ion exchange resins',
						type: 'Non-Hazardous',
						axis: 'waste:W-190905-Non-Hazardous-SaturatedOrSpentIonExchangeResinsMember',
					},
					{
						code: '19 09 06',
						description:
							'Solutions and sludges from regeneration of ion exchangers',
						type: 'Non-Hazardous',
						axis: 'waste:W-190906-Non-Hazardous-SolutionsAndSludgesFromRegenerationOfIonExchangersMember',
					},
					{
						code: '19 09 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-190999-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Wastes from shredding of metal-containing wastes',
				codes: [
					{
						code: '19 10 01',
						description: 'Iron and steel waste',
						type: 'Non-Hazardous',
						axis: 'waste:W-191001-Non-Hazardous-IronAndSteelWasteMember',
					},
					{
						code: '19 10 02',
						description: 'Non-ferrous waste',
						type: 'Non-Hazardous',
						axis: 'waste:W-191002-Non-Hazardous-Non-FerrousWasteMember',
					},
					{
						code: '19 10 03',
						description:
							'Fluff-light fraction and dust containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-191003-Hazardous-Fluff-LightFractionAndDustContainingHazardousSubstancesMember',
					},
					{
						code: '19 10 04',
						description:
							'Fluff-light fraction and dust other than those mentioned in 19 10 03',
						type: 'Non-Hazardous',
						axis: 'waste:W-191004-Non-Hazardous-Fluff-LightFractionAndDustOtherThanThoseMentionedIn191003Member',
					},
					{
						code: '19 10 05',
						description: 'Other fractions containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-191005-Hazardous-OtherFractionsContainingHazardousSubstancesMember',
					},
					{
						code: '19 10 06',
						description:
							'Other fractions other than those mentioned in 19 10 05',
						type: 'Non-Hazardous',
						axis: 'waste:W-191006-Non-Hazardous-OtherFractionsOtherThanThoseMentionedIn191005Member',
					},
				],
			},
			{
				label: 'Wastes from oil regeneration',
				codes: [
					{
						code: '19 11 01',
						description: 'Spent filter clays',
						type: 'Hazardous',
						axis: 'waste:W-191101-Hazardous-SpentFilterClaysMember',
					},
					{
						code: '19 11 02',
						description: 'Acid tars',
						type: 'Hazardous',
						axis: 'waste:W-191102-Hazardous-AcidTarsMember',
					},
					{
						code: '19 11 03',
						description: 'Aqueous liquid wastes',
						type: 'Hazardous',
						axis: 'waste:W-191103-Hazardous-AqueousLiquidWastesMember',
					},
					{
						code: '19 11 04',
						description: 'Wastes from cleaning of fuel with bases',
						type: 'Hazardous',
						axis: 'waste:W-191104-Hazardous-WastesFromCleaningOfFuelWithBasesMember',
					},
					{
						code: '19 11 05',
						description:
							'Sludges from on-site effluent treatment containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-191105-Hazardous-SludgesFromOn-SiteEffluentTreatmentContainingHazardousSubstancesMember',
					},
					{
						code: '19 11 06',
						description:
							'Sludges from on-site effluent treatment other than those mentioned in 19 11 05',
						type: 'Non-Hazardous',
						axis: 'waste:W-191106-Non-Hazardous-SludgesFromOn-SiteEffluentTreatmentOtherThanThoseMentionedIn191105Member',
					},
					{
						code: '19 11 07',
						description: 'Wastes from flue-gas cleaning',
						type: 'Hazardous',
						axis: 'waste:W-191107-Hazardous-WastesFromFlue-GasCleaningMember',
					},
					{
						code: '19 11 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-191199-Non-Hazardous-WastesNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label:
					'Wastes from the mechanical treatment of waste (for example sorting, crushing, compacting, pelletising) not otherwise specified',
				codes: [
					{
						code: '19 12 01',
						description: 'Paper and cardboard',
						type: 'Non-Hazardous',
						axis: 'waste:W-191201-Non-Hazardous-PaperAndCardboardMember',
					},
					{
						code: '19 12 02',
						description: 'Ferrous metal',
						type: 'Non-Hazardous',
						axis: 'waste:W-191202-Non-Hazardous-FerrousMetalMember',
					},
					{
						code: '19 12 03',
						description: 'Non-ferrous metal',
						type: 'Non-Hazardous',
						axis: 'waste:W-191203-Non-Hazardous-Non-FerrousMetalMember',
					},
					{
						code: '19 12 04',
						description: 'Plastic and rubber',
						type: 'Non-Hazardous',
						axis: 'waste:W-191204-Non-Hazardous-PlasticAndRubberMember',
					},
					{
						code: '19 12 05',
						description: 'Glass',
						type: 'Non-Hazardous',
						axis: 'waste:W-191205-Non-Hazardous-GlassMember',
					},
					{
						code: '19 12 06',
						description: 'Wood containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-191206-Hazardous-WoodContainingHazardousSubstancesMember',
					},
					{
						code: '19 12 07',
						description: 'Wood other than that mentioned in 19 12 06',
						type: 'Non-Hazardous',
						axis: 'waste:W-191207-Non-Hazardous-WoodOtherThanThatMentionedIn191206Member',
					},
					{
						code: '19 12 08',
						description: 'Textiles',
						type: 'Non-Hazardous',
						axis: 'waste:W-191208-Non-Hazardous-TextilesMember',
					},
					{
						code: '19 12 09',
						description: 'Minerals (for example sand, stones)',
						type: 'Non-Hazardous',
						axis: 'waste:W-191209-Non-Hazardous-MineralsForExampleSandStonesMember',
					},
					{
						code: '19 12 10',
						description: 'Combustible waste (refuse derived fuel)',
						type: 'Non-Hazardous',
						axis: 'waste:W-191210-Non-Hazardous-CombustibleWasteRefuseDerivedFuelMember',
					},
					{
						code: '19 12 11',
						description:
							'Other wastes (including mixtures of materials) from mechanical treatment of waste containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-191211-Hazardous-OtherWastesIncludingMixturesOfMaterialsFromMechanicalTreatmentOfWasteContainingHazardousSubstancesMember',
					},
					{
						code: '19 12 12',
						description:
							'Other wastes (including mixtures of materials) from mechanical treatment of wastes other than those mentioned in 19 12 11',
						type: 'Non-Hazardous',
						axis: 'waste:W-191212-Non-Hazardous-OtherWastesIncludingMixturesOfMaterialsFromMechanicalTreatmentOfWastesOtherThanThoseMentionedIn191211Member',
					},
				],
			},
			{
				label: 'Wastes from soil and groundwater remediation',
				codes: [
					{
						code: '19 13 01',
						description:
							'Solid wastes from soil remediation containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-191301-Hazardous-SolidWastesFromSoilRemediationContainingHazardousSubstancesMember',
					},
					{
						code: '19 13 02',
						description:
							'Solid wastes from soil remediation other than those mentioned in 19 13 01',
						type: 'Non-Hazardous',
						axis: 'waste:W-191302-Non-Hazardous-SolidWastesFromSoilRemediationOtherThanThoseMentionedIn191301Member',
					},
					{
						code: '19 13 03',
						description:
							'Sludges from soil remediation containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-191303-Hazardous-SludgesFromSoilRemediationContainingHazardousSubstancesMember',
					},
					{
						code: '19 13 04',
						description:
							'Sludges from soil remediation other than those mentioned in 19 13 03',
						type: 'Non-Hazardous',
						axis: 'waste:W-191304-Non-Hazardous-SludgesFromSoilRemediationOtherThanThoseMentionedIn191303Member',
					},
					{
						code: '19 13 05',
						description:
							'Sludges from groundwater remediation containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-191305-Hazardous-SludgesFromGroundwaterRemediationContainingHazardousSubstancesMember',
					},
					{
						code: '19 13 06',
						description:
							'Sludges from groundwater remediation other than those mentioned in 19 13 05',
						type: 'Non-Hazardous',
						axis: 'waste:W-191306-Non-Hazardous-SludgesFromGroundwaterRemediationOtherThanThoseMentionedIn191305Member',
					},
					{
						code: '19 13 07',
						description:
							'Aqueous liquid wastes and aqueous concentrates from groundwater remediation containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-191307-Hazardous-AqueousLiquidWastesAndAqueousConcentratesFromGroundwaterRemediationContainingHazardousSubstancesMember',
					},
					{
						code: '19 13 08',
						description:
							'Aqueous liquid wastes and aqueous concentrates from groundwater remediation other than those mentioned in 19 13 07',
						type: 'Non-Hazardous',
						axis: 'waste:W-191308-Non-Hazardous-AqueousLiquidWastesAndAqueousConcentratesFromGroundwaterRemediationOtherThanThoseMentionedIn191307Member',
					},
				],
			},
		],
	},
	{
		id: 20,
		label:
			'MUNICIPAL WASTES (HOUSEHOLD WASTE AND SIMILAR COMMERCIAL, INDUSTRIAL AND INSTITUTIONAL WASTES) INCLUDING SEPARATELY COLLECTED FRACTIONS',
		subcategories: [
			{
				label: 'Separately collected fractions (except 15 01)',
				codes: [
					{
						code: '20 01 01',
						description: 'Paper and cardboard',
						type: 'Non-Hazardous',
						axis: 'waste:W-200101-Non-Hazardous-PaperAndCardboardMember',
					},
					{
						code: '20 01 02',
						description: 'Glass',
						type: 'Non-Hazardous',
						axis: 'waste:W-200102-Non-Hazardous-GlassMember',
					},
					{
						code: '20 01 08',
						description: 'Biodegradable kitchen and canteen waste',
						type: 'Non-Hazardous',
						axis: 'waste:W-200108-Non-Hazardous-BiodegradableKitchenAndCanteenWasteMember',
					},
					{
						code: '20 01 10',
						description: 'Clothes',
						type: 'Non-Hazardous',
						axis: 'waste:W-200110-Non-Hazardous-ClothesMember',
					},
					{
						code: '20 01 11',
						description: 'Textiles',
						type: 'Non-Hazardous',
						axis: 'waste:W-200111-Non-Hazardous-TextilesMember',
					},
					{
						code: '20 01 13',
						description: 'Solvents',
						type: 'Hazardous',
						axis: 'waste:W-200113-Hazardous-SolventsMember',
					},
					{
						code: '20 01 14',
						description: 'Acids',
						type: 'Hazardous',
						axis: 'waste:W-200114-Hazardous-AcidsMember',
					},
					{
						code: '20 01 15',
						description: 'Alkalines',
						type: 'Hazardous',
						axis: 'waste:W-200115-Hazardous-AlkalinesMember',
					},
					{
						code: '20 01 17',
						description: 'Photochemicals',
						type: 'Hazardous',
						axis: 'waste:W-200117-Hazardous-PhotochemicalsMember',
					},
					{
						code: '20 01 19',
						description: 'Pesticides',
						type: 'Hazardous',
						axis: 'waste:W-200119-Hazardous-PesticidesMember',
					},
					{
						code: '20 01 21',
						description: 'Fluorescent tubes and other mercury-containing waste',
						type: 'Hazardous',
						axis: 'waste:W-200121-Hazardous-FluorescentTubesAndOtherMercury-ContainingWasteMember',
					},
					{
						code: '20 01 23',
						description: 'Discarded equipment containing chlorofluorocarbons',
						type: 'Hazardous',
						axis: 'waste:W-200123-Hazardous-DiscardedEquipmentContainingChlorofluorocarbonsMember',
					},
					{
						code: '20 01 25',
						description: 'Edible oil and fat',
						type: 'Non-Hazardous',
						axis: 'waste:W-200125-Non-Hazardous-EdibleOilAndFatMember',
					},
					{
						code: '20 01 26',
						description: 'Oil and fat other than those mentioned in 20 01 25',
						type: 'Hazardous',
						axis: 'waste:W-200126-Hazardous-OilAndFatOtherThanThoseMentionedIn200125Member',
					},
					{
						code: '20 01 27',
						description:
							'Paint, inks, adhesives and resins containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-200127-Hazardous-PaintInksAdhesivesAndResinsContainingHazardousSubstancesMember',
					},
					{
						code: '20 01 28',
						description:
							'Paint, inks, adhesives and resins other than those mentioned in 20 01 27',
						type: 'Non-Hazardous',
						axis: 'waste:W-200128-Non-Hazardous-PaintInksAdhesivesAndResinsOtherThanThoseMentionedIn200127Member',
					},
					{
						code: '20 01 29',
						description: 'Detergents containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-200129-Hazardous-DetergentsContainingHazardousSubstancesMember',
					},
					{
						code: '20 01 30',
						description: 'Detergents other than those mentioned in 20 01 29',
						type: 'Non-Hazardous',
						axis: 'waste:W-200130-Non-Hazardous-DetergentsOtherThanThoseMentionedIn200129Member',
					},
					{
						code: '20 01 31',
						description: 'Cytotoxic and cytostatic medicines',
						type: 'Hazardous',
						axis: 'waste:W-200131-Hazardous-CytotoxicAndCytostaticMedicinesMember',
					},
					{
						code: '20 01 32',
						description: 'Medicines other than those mentioned in 20 01 31',
						type: 'Non-Hazardous',
						axis: 'waste:W-200132-Non-Hazardous-MedicinesOtherThanThoseMentionedIn200131Member',
					},
					{
						code: '20 01 33',
						description:
							'Batteries and accumulators included in 16 06 01, 16 06 02 or 16 06 03 and unsorted batteries and accumulators containing these batteries',
						type: 'Hazardous',
						axis: 'waste:W-200133-Hazardous-BatteriesAndAccumulatorsIncludedIn160601160602Or160603AndUnsortedBatteriesAndAccumulatorsContainingTheseBatteriesMember',
					},
					{
						code: '20 01 34',
						description:
							'Batteries and accumulators other than those mentioned in 20 01 33',
						type: 'Non-Hazardous',
						axis: 'waste:W-200134-Non-Hazardous-BatteriesAndAccumulatorsOtherThanThoseMentionedIn200133Member',
					},
					{
						code: '20 01 35',
						description:
							'Discarded electrical and electronic equipment other than those mentioned in 20 01 21 and 20 01 23 containing hazardous components (3)',
						type: 'Hazardous',
						axis: 'waste:W-200135-Hazardous-DiscardedElectricalAndElectronicEquipmentOtherThanThoseMentionedIn200121And200123ContainingHazardousComponents3Member',
					},
					{
						code: '20 01 36',
						description:
							'Discarded electrical and electronic equipment other than those mentioned in 20 01 21, 20 01 23 and 20 01 35',
						type: 'Non-Hazardous',
						axis: 'waste:W-200136-Non-Hazardous-DiscardedElectricalAndElectronicEquipmentOtherThanThoseMentionedIn200121200123And200135Member',
					},
					{
						code: '20 01 37',
						description: 'Wood containing hazardous substances',
						type: 'Hazardous',
						axis: 'waste:W-200137-Hazardous-WoodContainingHazardousSubstancesMember',
					},
					{
						code: '20 01 38',
						description: 'Wood other than that mentioned in 20 01 37',
						type: 'Non-Hazardous',
						axis: 'waste:W-200138-Non-Hazardous-WoodOtherThanThatMentionedIn200137Member',
					},
					{
						code: '20 01 39',
						description: 'Plastics',
						type: 'Non-Hazardous',
						axis: 'waste:W-200139-Non-Hazardous-PlasticsMember',
					},
					{
						code: '20 01 40',
						description: 'Metals',
						type: 'Non-Hazardous',
						axis: 'waste:W-200140-Non-Hazardous-MetalsMember',
					},
					{
						code: '20 01 41',
						description: 'Wastes from chimney sweeping',
						type: 'Non-Hazardous',
						axis: 'waste:W-200141-Non-Hazardous-WastesFromChimneySweepingMember',
					},
					{
						code: '20 01 99',
						description: 'Other fractions not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-200199-Non-Hazardous-OtherFractionsNotOtherwiseSpecifiedMember',
					},
				],
			},
			{
				label: 'Garden and park wastes (including cemetery waste)',
				codes: [
					{
						code: '20 02 01',
						description: 'Biodegradable waste',
						type: 'Non-Hazardous',
						axis: 'waste:W-200201-Non-Hazardous-BiodegradableWasteMember',
					},
					{
						code: '20 02 02',
						description: 'Soil and stones',
						type: 'Non-Hazardous',
						axis: 'waste:W-200202-Non-Hazardous-SoilAndStonesMember',
					},
					{
						code: '20 02 03',
						description: 'Other non-biodegradable wastes',
						type: 'Non-Hazardous',
						axis: 'waste:W-200203-Non-Hazardous-OtherNon-BiodegradableWastesMember',
					},
				],
			},
			{
				label: 'Other municipal wastes',
				codes: [
					{
						code: '20 03 01',
						description: 'Mixed municipal waste',
						type: 'Non-Hazardous',
						axis: 'waste:W-200301-Non-Hazardous-MixedMunicipalWasteMember',
					},
					{
						code: '20 03 02',
						description: 'Waste from markets',
						type: 'Non-Hazardous',
						axis: 'waste:W-200302-Non-Hazardous-WasteFromMarketsMember',
					},
					{
						code: '20 03 03',
						description: 'Street-cleaning residues',
						type: 'Non-Hazardous',
						axis: 'waste:W-200303-Non-Hazardous-Street-CleaningResiduesMember',
					},
					{
						code: '20 03 04',
						description: 'Septic tank sludge',
						type: 'Non-Hazardous',
						axis: 'waste:W-200304-Non-Hazardous-SepticTankSludgeMember',
					},
					{
						code: '20 03 06',
						description: 'Waste from sewage cleaning',
						type: 'Non-Hazardous',
						axis: 'waste:W-200306-Non-Hazardous-WasteFromSewageCleaningMember',
					},
					{
						code: '20 03 07',
						description: 'Bulky waste',
						type: 'Non-Hazardous',
						axis: 'waste:W-200307-Non-Hazardous-BulkyWasteMember',
					},
					{
						code: '20 03 99',
						description: 'Municipal wastes not otherwise specified',
						type: 'Non-Hazardous',
						axis: 'waste:W-200399-Non-Hazardous-MunicipalWastesNotOtherwiseSpecifiedMember',
					},
				],
			},
		],
	},
]

export default EWC
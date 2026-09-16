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
					},
					{
						code: '01 01 02',
						description: 'Wastes from mineral non-metalliferous excavation',
						type: 'Non-Hazardous',
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
					},
					{
						code: '01 03 05',
						description: 'Other tailings containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '01 03 06',
						description:
							'Tailings other than those mentioned in 01 03 04 and 01 03 05',
						type: 'Non-Hazardous',
					},
					{
						code: '01 03 07',
						description:
							'Other wastes containing hazardous substances from physical and chemical processing of metalliferous minerals',
						type: 'Hazardous',
					},
					{
						code: '01 03 08',
						description:
							'Dusty and powdery wastes other than those mentioned in 01 03 07',
						type: 'Non-Hazardous',
					},
					{
						code: '01 03 09',
						description:
							'Red mud from alumina production other than the wastes mentioned in 01 03 10',
						type: 'Non-Hazardous',
					},
					{
						code: '01 03 10',
						description:
							'Red mud from alumina production containing hazardous substances other than the wastes mentioned in 01 03 07',
						type: 'Hazardous',
					},
					{
						code: '01 03 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
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
					},
					{
						code: '01 04 08',
						description:
							'Waste gravel and crushed rocks other than those mentioned in 01 04 07',
						type: 'Non-Hazardous',
					},
					{
						code: '01 04 09',
						description: 'Waste sand and clays',
						type: 'Non-Hazardous',
					},
					{
						code: '01 04 10',
						description:
							'Dusty and powdery wastes other than those mentioned in 01 04 07',
						type: 'Non-Hazardous',
					},
					{
						code: '01 04 11',
						description:
							'Wastes from potash and rock salt processing other than those mentioned in 01 04 07',
						type: 'Non-Hazardous',
					},
					{
						code: '01 04 12',
						description:
							'Tailings and other wastes from washing and cleaning of minerals other than those mentioned in 01 04 07 and 01 04 11',
						type: 'Non-Hazardous',
					},
					{
						code: '01 04 13',
						description:
							'Wastes from stone cutting and sawing other than those mentioned in 01 04 07',
						type: 'Non-Hazardous',
					},
					{
						code: '01 04 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
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
					},
					{
						code: '01 05 05',
						description: 'Oil-containing drilling muds and wastes',
						type: 'Hazardous',
					},
					{
						code: '01 05 06',
						description:
							'Drilling muds and other drilling wastes containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '01 05 07',
						description:
							'Barite-containing drilling muds and wastes other than those mentioned in 01 05 05 and 01 05 06',
						type: 'Non-Hazardous',
					},
					{
						code: '01 05 08',
						description:
							'Chloride-containing drilling muds and wastes other than those mentioned in 01 05 05 and 01 05 06',
						type: 'Non-Hazardous',
					},
					{
						code: '01 05 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
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
					},
					{
						code: '02 01 02',
						description: 'Animal-tissue waste',
						type: 'Non-Hazardous',
					},
					{
						code: '02 01 03',
						description: 'Plant-tissue waste',
						type: 'Non-Hazardous',
					},
					{
						code: '02 01 04',
						description: 'Waste plastics (except packaging)',
						type: 'Non-Hazardous',
					},
					{
						code: '02 01 06',
						description:
							'Animal faeces, urine and manure (including spoiled straw), effluent, collected separately and treated off-site',
						type: 'Non-Hazardous',
					},
					{
						code: '02 01 07',
						description: 'Wastes from forestry',
						type: 'Non-Hazardous',
					},
					{
						code: '02 01 08',
						description: 'Agrochemical waste containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '02 01 09',
						description:
							'Agrochemical waste other than those mentioned in 02 01 08',
						type: 'Non-Hazardous',
					},
					{
						code: '02 01 10',
						description: 'Waste metal',
						type: 'Non-Hazardous',
					},
					{
						code: '02 01 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
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
					},
					{
						code: '02 02 02',
						description: 'Animal-tissue waste',
						type: 'Non-Hazardous',
					},
					{
						code: '02 02 03',
						description: 'Materials unsuitable for consumption or processing',
						type: 'Non-Hazardous',
					},
					{
						code: '02 02 04',
						description: 'Sludges from on-site effluent treatment',
						type: 'Non-Hazardous',
					},
					{
						code: '02 02 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
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
					},
					{
						code: '02 03 02',
						description: 'Wastes from preserving agents',
						type: 'Non-Hazardous',
					},
					{
						code: '02 03 03',
						description: 'Wastes from solvent extraction',
						type: 'Non-Hazardous',
					},
					{
						code: '02 03 04',
						description: 'Materials unsuitable for consumption or processing',
						type: 'Non-Hazardous',
					},
					{
						code: '02 03 05',
						description: 'Sludges from on-site effluent treatment',
						type: 'Non-Hazardous',
					},
					{
						code: '02 03 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
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
					},
					{
						code: '02 04 02',
						description: 'Off-specification calcium carbonate',
						type: 'Non-Hazardous',
					},
					{
						code: '02 04 03',
						description: 'Sludges from on-site effluent treatment',
						type: 'Non-Hazardous',
					},
					{
						code: '02 04 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
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
					},
					{
						code: '02 05 02',
						description: 'Sludges from on-site effluent treatment',
						type: 'Non-Hazardous',
					},
					{
						code: '02 05 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
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
					},
					{
						code: '02 06 02',
						description: 'Wastes from preserving agents',
						type: 'Non-Hazardous',
					},
					{
						code: '02 06 03',
						description: 'Sludges from on-site effluent treatment',
						type: 'Non-Hazardous',
					},
					{
						code: '02 06 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
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
					},
					{
						code: '02 07 02',
						description: 'Wastes from spirits distillation',
						type: 'Non-Hazardous',
					},
					{
						code: '02 07 03',
						description: 'Wastes from chemical treatment',
						type: 'Non-Hazardous',
					},
					{
						code: '02 07 04',
						description: 'Materials unsuitable for consumption or processing',
						type: 'Non-Hazardous',
					},
					{
						code: '02 07 05',
						description: 'Sludges from on-site effluent treatment',
						type: 'Non-Hazardous',
					},
					{
						code: '02 07 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
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
					},
					{
						code: '03 01 04',
						description:
							'Sawdust, shavings, cuttings, wood, particle board and veneer containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '03 01 05',
						description:
							'Sawdust, shavings, cuttings, wood, particle board and veneer other than those mentioned in 03 01 04',
						type: 'Non-Hazardous',
					},
					{
						code: '03 01 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
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
					},
					{
						code: '03 02 02',
						description: 'Organochlorinated wood preservatives',
						type: 'Hazardous',
					},
					{
						code: '03 02 03',
						description: 'Organometallic wood preservatives',
						type: 'Hazardous',
					},
					{
						code: '03 02 04',
						description: 'Inorganic wood preservatives',
						type: 'Hazardous',
					},
					{
						code: '03 02 05',
						description:
							'Other wood preservatives containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '03 02 99',
						description: 'Wood preservatives not otherwise specified',
						type: 'Non-Hazardous',
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
					},
					{
						code: '03 03 02',
						description:
							'Green liquor sludge (from recovery of cooking liquor)',
						type: 'Non-Hazardous',
					},
					{
						code: '03 03 05',
						description: 'De-inking sludges from paper recycling',
						type: 'Non-Hazardous',
					},
					{
						code: '03 03 07',
						description:
							'Mechanically separated rejects from pulping of waste paper and cardboard',
						type: 'Non-Hazardous',
					},
					{
						code: '03 03 08',
						description:
							'Wastes from sorting of paper and cardboard destined for recycling',
						type: 'Non-Hazardous',
					},
					{
						code: '03 03 09',
						description: 'Lime mud waste',
						type: 'Non-Hazardous',
					},
					{
						code: '03 03 10',
						description:
							'Fibre rejects, fibre-, filler- and coating-sludges from mechanical separation',
						type: 'Non-Hazardous',
					},
					{
						code: '03 03 11',
						description:
							'Sludges from on-site effluent treatment other than those mentioned in 03 03 10',
						type: 'Non-Hazardous',
					},
					{
						code: '03 03 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
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
					},
					{
						code: '04 01 02',
						description: 'Liming waste',
						type: 'Non-Hazardous',
					},
					{
						code: '04 01 03',
						description:
							'Chromium-containing leather dust, ash, sludges and flakes',
						type: 'Non-Hazardous',
					},
					{
						code: '04 01 04',
						description:
							'Chromium-containing leather dust, ash, sludges and flakes containing Cr(VI)',
						type: 'Hazardous',
					},
					{
						code: '04 01 05',
						description: 'Degreasing waste containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '04 01 06',
						description:
							'Degreasing waste other than those mentioned in 04 01 05',
						type: 'Non-Hazardous',
					},
					{
						code: '04 01 07',
						description: 'Tanning liquor containing chromium',
						type: 'Hazardous',
					},
					{
						code: '04 01 08',
						description:
							'Tanning liquor other than those mentioned in 04 01 07',
						type: 'Non-Hazardous',
					},
					{
						code: '04 01 09',
						description:
							'Sludges, particularly lime and chromium-containing sludges from tanning',
						type: 'Hazardous',
					},
					{
						code: '04 01 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Wastes from the textile industry',
				codes: [
					{
						code: '04 02 09',
						description: 'Dyes and pigments containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '04 02 10',
						description:
							'Dyes and pigments other than those mentioned in 04 02 09',
						type: 'Non-Hazardous',
					},
					{
						code: '04 02 14',
						description:
							'Wastes from finishing containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '04 02 15',
						description:
							'Wastes from finishing other than those mentioned in 04 02 14',
						type: 'Non-Hazardous',
					},
					{
						code: '04 02 16',
						description: 'Dyeing waste',
						type: 'Non-Hazardous',
					},
					{
						code: '04 02 19',
						description:
							'Sludges from dyeing and finishing containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '04 02 20',
						description:
							'Sludges from dyeing and finishing other than those mentioned in 04 02 19',
						type: 'Non-Hazardous',
					},
					{
						code: '04 02 21',
						description:
							'Wastes from chemical treatment and dyeing containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '04 02 22',
						description:
							'Wastes from chemical treatment and dyeing other than those mentioned in 04 02 21',
						type: 'Non-Hazardous',
					},
					{
						code: '04 02 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
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
						description:
							'Desalting and dehydration sludges containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '05 01 03',
						description:
							'Desalting and dehydration sludges other than those mentioned in 05 01 02',
						type: 'Non-Hazardous',
					},
					{
						code: '05 01 04',
						description: 'Acid alkylation sludges',
						type: 'Hazardous',
					},
					{
						code: '05 01 05',
						description:
							'Other sludges from desulphurisation of petroleum fractions',
						type: 'Hazardous',
					},
					{
						code: '05 01 06',
						description:
							'Sludges from desulphurisation of petroleum fractions other than those mentioned in 05 01 05',
						type: 'Non-Hazardous',
					},
					{
						code: '05 01 07',
						description: 'Bituminous sludges from the bottom of storage tanks',
						type: 'Hazardous',
					},
					{
						code: '05 01 08',
						description:
							'Bituminous sludges from the bottom of storage tanks other than those mentioned in 05 01 07',
						type: 'Non-Hazardous',
					},
					{
						code: '05 01 09',
						description: 'Acid tars',
						type: 'Hazardous',
					},
					{
						code: '05 01 11',
						description:
							'Sludges from the biological treatment of refinery effluents containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '05 01 12',
						description:
							'Sludges from the biological treatment of refinery effluents other than those mentioned in 05 01 11',
						type: 'Non-Hazardous',
					},
					{
						code: '05 01 13',
						description:
							'Other wastes from refinery operations containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '05 01 14',
						description:
							'Other wastes from refinery operations other than those mentioned in 05 01 13',
						type: 'Non-Hazardous',
					},
					{
						code: '05 01 15',
						description: 'Waste water from cleaning of tanks',
						type: 'Non-Hazardous',
					},
					{
						code: '05 01 16',
						description: 'Spent catalysts not otherwise specified',
						type: 'Non-Hazardous',
					},
					{
						code: '05 01 17',
						description:
							'Hazardous spent catalysts containing arsenic, lead or nickel',
						type: 'Hazardous',
					},
					{
						code: '05 01 18',
						description:
							'Spent catalysts other than those mentioned in 05 01 17',
						type: 'Non-Hazardous',
					},
					{
						code: '05 01 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label:
					'Wastes from natural gas purification and pyrolytic treatment of coal',
				codes: [
					{
						code: '05 02 01',
						description: 'Sludges from washing and cleaning',
						type: 'Non-Hazardous',
					},
					{
						code: '05 02 02',
						description: 'Tar and tarry wastes',
						type: 'Hazardous',
					},
					{
						code: '05 02 03',
						description: 'Other wastes from pyrolytic treatment of coal',
						type: 'Non-Hazardous',
					},
					{
						code: '05 02 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
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
					},
					{
						code: '06 01 02',
						description: 'Hydrochloric acid',
						type: 'Hazardous',
					},
					{
						code: '06 01 03',
						description: 'Hydrofluoric acid',
						type: 'Hazardous',
					},
					{
						code: '06 01 04',
						description: 'Phosphoric and polyphosphoric acid',
						type: 'Hazardous',
					},
					{
						code: '06 01 05',
						description: 'Nitric acid and nitrous acid',
						type: 'Hazardous',
					},
					{
						code: '06 01 06',
						description: 'Other acids',
						type: 'Hazardous',
					},
					{
						code: '06 01 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
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
					},
					{
						code: '06 02 03',
						description: 'Ammonium hydroxide',
						type: 'Hazardous',
					},
					{
						code: '06 02 04',
						description: 'Sodium hydroxide and potassium hydroxide',
						type: 'Hazardous',
					},
					{
						code: '06 02 05',
						description: 'Other bases',
						type: 'Hazardous',
					},
					{
						code: '06 02 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Wastes from the MFSU of salts, their solutions and mixtures',
				codes: [
					{
						code: '06 03 11',
						description: 'Waste phosphogypsum',
						type: 'Hazardous',
					},
					{
						code: '06 03 13',
						description:
							'Wastes from the manufacture of mineral salts containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '06 03 14',
						description:
							'Wastes from the manufacture of mineral salts other than those mentioned in 06 03 13',
						type: 'Non-Hazardous',
					},
					{
						code: '06 03 15',
						description: 'Sodium chlorate solution',
						type: 'Hazardous',
					},
					{
						code: '06 03 16',
						description: 'Asbestos-containing wastes',
						type: 'Hazardous',
					},
					{
						code: '06 03 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Wastes from the MFSU of oxidising agents',
				codes: [
					{
						code: '06 04 03',
						description: 'Peroxide sludges',
						type: 'Hazardous',
					},
					{
						code: '06 04 04',
						description:
							'Other wastes from the manufacture of oxidising agents',
						type: 'Non-Hazardous',
					},
					{
						code: '06 04 05',
						description: 'Wastes from the MFSU of halogens',
						type: 'Hazardous',
					},
					{
						code: '06 04 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Wastes from the MFSU of salts and their solutions',
				codes: [
					{
						code: '06 05 02',
						description:
							'Sludges and filter cakes from basic chrome salt production',
						type: 'Hazardous',
					},
					{
						code: '06 05 03',
						description: 'Wastes from chromium salt and dichromate production',
						type: 'Hazardous',
					},
					{
						code: '06 05 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Wastes from the MFSU of other inorganic chemicals',
				codes: [
					{
						code: '06 06 02',
						description: 'Chlorine production sludges',
						type: 'Hazardous',
					},
					{
						code: '06 06 03',
						description: 'Mercury-containing wastes',
						type: 'Hazardous',
					},
					{
						code: '06 06 04',
						description: 'Zinc-containing wastes',
						type: 'Hazardous',
					},
					{
						code: '06 06 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Wastes from the MFSU of fluorine compounds',
				codes: [
					{
						code: '06 07 01',
						description: 'Calcium fluoride sludges',
						type: 'Hazardous',
					},
					{
						code: '06 07 02',
						description: 'Silicofluoric acid and silicofluoric acid sludges',
						type: 'Hazardous',
					},
					{
						code: '06 07 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
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
				label: 'Wastes from the MFSU of basic organic chemicals',
				codes: [
					{
						code: '07 01 01',
						description: 'Aqueous washing liquids and mother liquors',
						type: 'Hazardous',
					},
					{
						code: '07 01 03',
						description: 'Solvent, still bottoms and reaction residues',
						type: 'Hazardous',
					},
					{
						code: '07 01 04',
						description:
							'Other organic solvents, still bottoms and reaction residues',
						type: 'Hazardous',
					},
					{
						code: '07 01 07',
						description:
							'Halogenated organic solvents, still bottoms and reaction residues',
						type: 'Hazardous',
					},
					{
						code: '07 01 08',
						description: 'Other solvents, still bottoms and reaction residues',
						type: 'Hazardous',
					},
					{
						code: '07 01 09',
						description: 'Halogenated filter cakes and spent filter material',
						type: 'Hazardous',
					},
					{
						code: '07 01 10',
						description: 'Other filter cakes and spent filter material',
						type: 'Hazardous',
					},
					{
						code: '07 01 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Wastes from the MFSU of plastics',
				codes: [
					{
						code: '07 02 01',
						description: 'Aqueous washing liquors and mother liquors',
						type: 'Hazardous',
					},
					{
						code: '07 02 03',
						description: 'Solvent, still bottoms and reaction residues',
						type: 'Hazardous',
					},
					{
						code: '07 02 04',
						description:
							'Other organic solvents, still bottoms and reaction residues',
						type: 'Hazardous',
					},
					{
						code: '07 02 07',
						description: 'Halogenated filter cakes and spent filter material',
						type: 'Hazardous',
					},
					{
						code: '07 02 08',
						description: 'Other filter cakes and spent filter material',
						type: 'Hazardous',
					},
					{
						code: '07 02 09',
						description:
							'Plastics-processing waste containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '07 02 10',
						description:
							'Plastics-processing waste other than those mentioned in 07 02 09',
						type: 'Non-Hazardous',
					},
					{
						code: '07 02 11',
						description: 'Waste plastic',
						type: 'Non-Hazardous',
					},
					{
						code: '07 02 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label:
					'Wastes from the MFSU of organic dyes and pigments (except 06 03 11 and 06 03 12)',
				codes: [
					{
						code: '07 03 01',
						description: 'Aqueous washing liquors and mother liquors',
						type: 'Hazardous',
					},
					{
						code: '07 03 03',
						description: 'Solvent, still bottoms and reaction residues',
						type: 'Hazardous',
					},
					{
						code: '07 03 04',
						description:
							'Halogenated organic solvents, still bottoms and reaction residues',
						type: 'Hazardous',
					},
					{
						code: '07 03 07',
						description: 'Halogenated filter cakes and spent filter material',
						type: 'Hazardous',
					},
					{
						code: '07 03 08',
						description: 'Other filter cakes and spent filter material',
						type: 'Hazardous',
					},
					{
						code: '07 03 09',
						description: 'Dye or pigment-containing wastes',
						type: 'Hazardous',
					},
					{
						code: '07 03 10',
						description:
							'Wastes from dye or pigment manufacturing other than those mentioned in 07 03 09',
						type: 'Non-Hazardous',
					},
					{
						code: '07 03 11',
						description:
							'Wastes from manufacture of organic dyes and pigments other than those mentioned in 07 03 09 and 07 03 10',
						type: 'Non-Hazardous',
					},
					{
						code: '07 03 12',
						description: 'Waste organic solvents',
						type: 'Hazardous',
					},
					{
						code: '07 03 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label:
					'Wastes from the MFSU of organic plant protection products (except 02 01 08 and 02 01 09) and of biocides',
				codes: [
					{
						code: '07 04 01',
						description: 'Aqueous washing liquors and mother liquors',
						type: 'Hazardous',
					},
					{
						code: '07 04 03',
						description: 'Solvent, still bottoms and reaction residues',
						type: 'Hazardous',
					},
					{
						code: '07 04 04',
						description:
							'Halogenated organic solvents, still bottoms and reaction residues',
						type: 'Hazardous',
					},
					{
						code: '07 04 07',
						description: 'Halogenated filter cakes and spent filter material',
						type: 'Hazardous',
					},
					{
						code: '07 04 08',
						description: 'Other filter cakes and spent filter material',
						type: 'Hazardous',
					},
					{
						code: '07 04 09',
						description:
							'Wastes containing plant protection product or biocide constituents',
						type: 'Hazardous',
					},
					{
						code: '07 04 10',
						description: 'Wastes containing organic solvents',
						type: 'Hazardous',
					},
					{
						code: '07 04 11',
						description: 'Waste halogenated organic solvents',
						type: 'Hazardous',
					},
					{
						code: '07 04 13',
						description: 'Wastes from the MFSU of pesticides or biocides',
						type: 'Hazardous',
					},
					{
						code: '07 04 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Wastes from the MFSU of pharmaceuticals',
				codes: [
					{
						code: '07 05 01',
						description: 'Aqueous washing liquors and mother liquors',
						type: 'Hazardous',
					},
					{
						code: '07 05 03',
						description: 'Solvent, still bottoms and reaction residues',
						type: 'Hazardous',
					},
					{
						code: '07 05 04',
						description:
							'Halogenated organic solvents, still bottoms and reaction residues',
						type: 'Hazardous',
					},
					{
						code: '07 05 07',
						description: 'Halogenated filter cakes and spent filter material',
						type: 'Hazardous',
					},
					{
						code: '07 05 08',
						description: 'Other filter cakes and spent filter material',
						type: 'Hazardous',
					},
					{
						code: '07 05 09',
						description: 'Waste organic solvents',
						type: 'Hazardous',
					},
					{
						code: '07 05 10',
						description: 'Waste halogenated organic solvents',
						type: 'Hazardous',
					},
					{
						code: '07 05 11',
						description: 'Pharmaceutical waste containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '07 05 12',
						description:
							'Pharmaceutical waste other than those mentioned in 07 05 11',
						type: 'Non-Hazardous',
					},
					{
						code: '07 05 13',
						description: 'Waste plastics',
						type: 'Non-Hazardous',
					},
					{
						code: '07 05 14',
						description: 'Waste metal',
						type: 'Non-Hazardous',
					},
					{
						code: '07 05 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Wastes from the MFSU of fats and oils',
				codes: [
					{
						code: '07 06 01',
						description: 'Aqueous washing liquors and mother liquors',
						type: 'Hazardous',
					},
					{
						code: '07 06 03',
						description: 'Solvent, still bottoms and reaction residues',
						type: 'Hazardous',
					},
					{
						code: '07 06 07',
						description: 'Halogenated filter cakes and spent filter material',
						type: 'Hazardous',
					},
					{
						code: '07 06 08',
						description: 'Other filter cakes and spent filter material',
						type: 'Hazardous',
					},
					{
						code: '07 06 09',
						description: 'Waste organic solvents',
						type: 'Hazardous',
					},
					{
						code: '07 06 10',
						description: 'Waste halogenated organic solvents',
						type: 'Hazardous',
					},
					{
						code: '07 06 11',
						description:
							'Wastes from MFSU of fats and oils containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '07 06 12',
						description:
							'Wastes from MFSU of fats and oils other than those mentioned in 07 06 11',
						type: 'Non-Hazardous',
					},
					{
						code: '07 06 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label:
					'Wastes from the MFSU of fine chemicals and chemical preparations (except 07 01, 07 02, 07 03, 07 04, 07 05 and 07 06)',
				codes: [
					{
						code: '07 07 01',
						description: 'Aqueous washing liquors and mother liquors',
						type: 'Hazardous',
					},
					{
						code: '07 07 03',
						description: 'Solvent, still bottoms and reaction residues',
						type: 'Hazardous',
					},
					{
						code: '07 07 04',
						description:
							'Halogenated organic solvents, still bottoms and reaction residues',
						type: 'Hazardous',
					},
					{
						code: '07 07 07',
						description: 'Halogenated filter cakes and spent filter material',
						type: 'Hazardous',
					},
					{
						code: '07 07 08',
						description: 'Other filter cakes and spent filter material',
						type: 'Hazardous',
					},
					{
						code: '07 07 09',
						description: 'Waste organic solvents',
						type: 'Hazardous',
					},
					{
						code: '07 07 10',
						description: 'Waste halogenated organic solvents',
						type: 'Hazardous',
					},
					{
						code: '07 07 11',
						description:
							'Wastes from the MFSU of fine chemicals and chemical preparations containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '07 07 12',
						description:
							'Wastes from the MFSU of fine chemicals and chemical preparations other than those mentioned in 07 07 11',
						type: 'Non-Hazardous',
					},
					{
						code: '07 07 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
		],
	},
	{
		id: 8,
		label:
			'WASTES FROM THE MANUFACTURE, FORMULATION, SUPPLY AND USE (MFSU) OF COATINGS (PAINTS, VARNISHES AND LACQUERS), ADHESIVES, SEALANTS AND PRINTING INKS',
		subcategories: [
			{
				label: 'Wastes from the MFSU of paint and varnish',
				codes: [
					{
						code: '08 01 11',
						description:
							'Waste paint and varnish containing organic solvents or other hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '08 01 12',
						description:
							'Waste paint and varnish other than those mentioned in 08 01 11',
						type: 'Non-Hazardous',
					},
					{
						code: '08 01 13',
						description:
							'Paint or varnish sludges containing organic solvents or other hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '08 01 14',
						description:
							'Paint or varnish sludges other than those mentioned in 08 01 13',
						type: 'Non-Hazardous',
					},
					{
						code: '08 01 15',
						description:
							'Aqueous sludges containing paint or varnish containing organic solvents or other hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '08 01 16',
						description:
							'Aqueous sludges containing paint or varnish other than those mentioned in 08 01 15',
						type: 'Non-Hazardous',
					},
					{
						code: '08 01 17',
						description: 'Paint stripper and remover sludges',
						type: 'Hazardous',
					},
					{
						code: '08 01 18',
						description: 'Waste organic solvents',
						type: 'Hazardous',
					},
					{
						code: '08 01 19',
						description: 'Waste halogenated organic solvents',
						type: 'Hazardous',
					},
					{
						code: '08 01 20',
						description: 'Waste kerosene and other fractions',
						type: 'Non-Hazardous',
					},
					{
						code: '08 01 21',
						description: 'Waste water containing paint or varnish',
						type: 'Non-Hazardous',
					},
					{
						code: '08 01 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label:
					'Wastes from the MFSU of adhesives and sealants (including waterproofing products)',
				codes: [
					{
						code: '08 02 01',
						description:
							'Waste adhesives and sealants containing organic solvents or other hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '08 02 02',
						description:
							'Waste adhesives and sealants other than those mentioned in 08 02 01',
						type: 'Non-Hazardous',
					},
					{
						code: '08 02 03',
						description:
							'Sludges or solid wastes containing adhesives or sealants containing organic solvents or other hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '08 02 04',
						description:
							'Sludges or solid wastes containing adhesives or sealants other than those mentioned in 08 02 03',
						type: 'Non-Hazardous',
					},
					{
						code: '08 02 05',
						description: 'Waste organic solvents',
						type: 'Hazardous',
					},
					{
						code: '08 02 06',
						description: 'Waste halogenated organic solvents',
						type: 'Hazardous',
					},
					{
						code: '08 02 07',
						description: 'Waste water containing adhesives or sealants',
						type: 'Non-Hazardous',
					},
					{
						code: '08 02 08',
						description:
							'Waste adhesives and sealants other than those mentioned in 08 02 01 and 08 02 02',
						type: 'Non-Hazardous',
					},
					{
						code: '08 02 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Wastes from the MFSU of printing inks',
				codes: [
					{
						code: '08 03 07',
						description: 'Printing ink sludges containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '08 03 08',
						description:
							'Printing ink sludges other than those mentioned in 08 03 07',
						type: 'Non-Hazardous',
					},
					{
						code: '08 03 12',
						description: 'Waste organic solvents',
						type: 'Hazardous',
					},
					{
						code: '08 03 13',
						description: 'Waste halogenated organic solvents',
						type: 'Hazardous',
					},
					{
						code: '08 03 14',
						description: 'Waste solvent mixtures',
						type: 'Non-Hazardous',
					},
					{
						code: '08 03 15',
						description: 'Waste halogenated solvent mixtures',
						type: 'Non-Hazardous',
					},
					{
						code: '08 03 16',
						description: 'Waste printing ink',
						type: 'Non-Hazardous',
					},
					{
						code: '08 03 17',
						description: 'Waste water containing printing ink',
						type: 'Non-Hazardous',
					},
					{
						code: '08 03 18',
						description: 'Waste isocyanates',
						type: 'Non-Hazardous',
					},
					{
						code: '08 03 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Wastes from the MFSU of pharmaceuticals',
				codes: [
					{
						code: '08 04 09',
						description: 'Waste products containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '08 04 10',
						description:
							'Waste products other than those mentioned in 08 04 09',
						type: 'Non-Hazardous',
					},
					{
						code: '08 04 11',
						description: 'Waste organic solvents',
						type: 'Hazardous',
					},
					{
						code: '08 04 12',
						description: 'Waste halogenated organic solvents',
						type: 'Hazardous',
					},
					{
						code: '08 04 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Wastes from the MFSU of cosmetics',
				codes: [
					{
						code: '08 05 01',
						description: 'Waste products containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '08 05 02',
						description:
							'Waste products other than those mentioned in 08 05 01',
						type: 'Non-Hazardous',
					},
					{
						code: '08 05 03',
						description: 'Waste organic solvents',
						type: 'Hazardous',
					},
					{
						code: '08 05 04',
						description: 'Waste halogenated organic solvents',
						type: 'Hazardous',
					},
					{
						code: '08 05 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Wastes from the MFSU of other chemical products',
				codes: [
					{
						code: '08 06 01',
						description: 'Waste products containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '08 06 02',
						description:
							'Waste products other than those mentioned in 08 06 01',
						type: 'Non-Hazardous',
					},
					{
						code: '08 06 03',
						description: 'Waste organic solvents',
						type: 'Hazardous',
					},
					{
						code: '08 06 04',
						description: 'Waste halogenated organic solvents',
						type: 'Hazardous',
					},
					{
						code: '08 06 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Wastes from the removal of paint and varnish',
				codes: [
					{
						code: '08 07 01',
						description:
							'Waste products from the removal of paint and varnish containing organic solvents or other hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '08 07 08',
						description: 'Waste organic solvents',
						type: 'Hazardous',
					},
					{
						code: '08 07 09',
						description: 'Waste halogenated organic solvents',
						type: 'Hazardous',
					},
					{
						code: '08 07 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
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
					},
					{
						code: '09 01 02',
						description: 'Water-based offset printing developer solutions',
						type: 'Hazardous',
					},
					{
						code: '09 01 03',
						description: 'Solvent-based developer solutions',
						type: 'Hazardous',
					},
					{
						code: '09 01 04',
						description: 'Fixer solutions',
						type: 'Hazardous',
					},
					{
						code: '09 01 05',
						description: 'Bleach and bleach-fix solutions',
						type: 'Hazardous',
					},
					{
						code: '09 01 06',
						description: 'Silver-containing photographic waste and film',
						type: 'Hazardous',
					},
					{
						code: '09 01 07',
						description:
							'Photographic film and paper containing silver or silver compounds',
						type: 'Non-Hazardous',
					},
					{
						code: '09 01 08',
						description: 'Photographic aluminium waste',
						type: 'Non-Hazardous',
					},
					{
						code: '09 01 12',
						description: 'Used photo-mask and blueprint',
						type: 'Hazardous',
					},
					{
						code: '09 01 13',
						description: 'Coating sludges from photographic processing',
						type: 'Hazardous',
					},
					{
						code: '09 01 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
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
					'Wastes from power stations and other combustion installations (except 19)',
				codes: [
					{
						code: '10 01 01',
						description:
							'Bottom ash, slag and boiler dust (excluding boiler dust mentioned in 10 01 04)',
						type: 'Non-Hazardous',
					},
					{
						code: '10 01 02',
						description: 'Coal fly ash',
						type: 'Non-Hazardous',
					},
					{
						code: '10 01 04',
						description: 'Coal fly ash containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '10 01 05',
						description:
							'Calcium sulphate-based desulphurisation products from coal-fired power stations',
						type: 'Non-Hazardous',
					},
					{
						code: '10 01 08',
						description:
							'Flue gas cleaning precipitates from coal-fired power stations containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '10 01 09',
						description:
							'Flue gas cleaning precipitates from coal-fired power stations other than those mentioned in 10 01 08',
						type: 'Non-Hazardous',
					},
					{
						code: '10 01 12',
						description:
							'Fly ash from biomass combustion containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '10 01 13',
						description:
							'Fly ash from biomass combustion other than those mentioned in 10 01 12',
						type: 'Non-Hazardous',
					},
					{
						code: '10 01 14',
						description:
							'Bottom ash and slag from biomass combustion containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '10 01 15',
						description:
							'Bottom ash and slag from biomass combustion other than those mentioned in 10 01 14',
						type: 'Non-Hazardous',
					},
					{
						code: '10 01 16',
						description:
							'Flue gas cleaning residues from biomass combustion containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '10 01 17',
						description:
							'Flue gas cleaning residues from biomass combustion other than those mentioned in 10 01 16',
						type: 'Non-Hazardous',
					},
					{
						code: '10 01 18',
						description:
							'Wastes from gas cleaning containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '10 01 19',
						description:
							'Wastes from gas cleaning other than those mentioned in 10 01 18 and 10 01 17',
						type: 'Non-Hazardous',
					},
					{
						code: '10 01 20',
						description: 'Kerosene and other fuel-based fly ash',
						type: 'Hazardous',
					},
					{
						code: '10 01 21',
						description: 'Other fly ash',
						type: 'Non-Hazardous',
					},
					{
						code: '10 01 22',
						description:
							'Calcium sulphate-based desulphurisation products containing hazardous substances',
						type: 'Non-Hazardous',
					},
					{
						code: '10 01 23',
						description:
							'Calcium sulphate-based desulphurisation products other than those mentioned in 10 01 22',
						type: 'Non-Hazardous',
					},
					{
						code: '10 01 24',
						description: 'Other desulphurisation products',
						type: 'Non-Hazardous',
					},
					{
						code: '10 01 25',
						description:
							'Sludges from flue gas cleaning containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '10 01 26',
						description:
							'Sludges from flue gas cleaning other than those mentioned in 10 01 25',
						type: 'Non-Hazardous',
					},
					{
						code: '10 01 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Wastes from coal gasification',
				codes: [
					{
						code: '10 02 01',
						description:
							'Hard coal gasification slag from coal gasification plant using the dry ash process',
						type: 'Non-Hazardous',
					},
					{
						code: '10 02 07',
						description: 'Tar and tar containing wastes from coal gasification',
						type: 'Non-Hazardous',
					},
					{
						code: '10 02 08',
						description:
							'Other wastes from coal gasification containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '10 02 09',
						description:
							'Other wastes from coal gasification other than those mentioned in 10 02 08',
						type: 'Non-Hazardous',
					},
					{
						code: '10 02 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Wastes from fluidised bed combustion',
				codes: [
					{
						code: '10 03 01',
						description: 'Fluidised bed combustion fly ash',
						type: 'Non-Hazardous',
					},
					{
						code: '10 03 02',
						description:
							'Fluidised bed combustion fly ash containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '10 03 03',
						description: 'Fluidised bed combustion bottom ash',
						type: 'Non-Hazardous',
					},
					{
						code: '10 03 04',
						description: 'Calcium-based desulphurisation product',
						type: 'Non-Hazardous',
					},
					{
						code: '10 03 05',
						description: 'Fluidised bed combustion slag',
						type: 'Non-Hazardous',
					},
					{
						code: '10 03 06',
						description:
							'Fluidised bed combustion waste containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '10 03 07',
						description: 'Other fluidised bed combustion waste',
						type: 'Non-Hazardous',
					},
					{
						code: '10 03 08',
						description: 'Waste water from fluidised bed combustion',
						type: 'Non-Hazardous',
					},
					{
						code: '10 03 09',
						description: 'Non-metalliferous waste',
						type: 'Non-Hazardous',
					},
					{
						code: '10 03 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label:
					'Wastes from the roasting and sintering of metallic ores and of concentrates',
				codes: [
					{
						code: '10 04 01',
						description:
							'Dust and particles from roasting and sintering of metallic ores',
						type: 'Non-Hazardous',
					},
					{
						code: '10 04 02',
						description:
							'Dust and particles from roasting and sintering of metallic ores containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '10 04 03',
						description:
							'Flue gas cleaning dust and sludges from roasting and sintering of concentrates',
						type: 'Hazardous',
					},
					{
						code: '10 04 04',
						description:
							'Other dust, slag and sludges from roasting and sintering of metallic ores',
						type: 'Non-Hazardous',
					},
					{
						code: '10 04 05',
						description:
							'Slag from roasting and sintering of metallic ores and concentrates',
						type: 'Non-Hazardous',
					},
					{
						code: '10 04 06',
						description:
							'Calcines from roasting and sintering of metallic ores containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '10 04 07',
						description:
							'Calcines from roasting and sintering of metallic ores other than those mentioned in 10 04 06',
						type: 'Non-Hazardous',
					},
					{
						code: '10 04 09',
						description:
							'Flue gas cleaning dust containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '10 04 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Wastes from casting of ferrous metals',
				codes: [
					{
						code: '10 05 01',
						description: 'Dust and particles from casting of ferrous metals',
						type: 'Non-Hazardous',
					},
					{
						code: '10 05 02',
						description:
							'Dust and particles from casting of ferrous metals containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '10 05 03',
						description: 'Sludges and filter cakes from gas cleaning',
						type: 'Non-Hazardous',
					},
					{
						code: '10 05 04',
						description:
							'Sludges and filter cakes from gas cleaning containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '10 05 05',
						description: 'Refractory materials',
						type: 'Non-Hazardous',
					},
					{
						code: '10 05 06',
						description: 'Refractory materials containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '10 05 09',
						description: 'Non-metalliferous waste',
						type: 'Non-Hazardous',
					},
					{
						code: '10 05 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Wastes from casting of non-ferrous metals',
				codes: [
					{
						code: '10 06 01',
						description:
							'Dust and particles from casting of non-ferrous metals',
						type: 'Non-Hazardous',
					},
					{
						code: '10 06 02',
						description:
							'Dust and particles from casting of non-ferrous metals containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '10 06 03',
						description: 'Sludges and filter cakes from gas cleaning',
						type: 'Non-Hazardous',
					},
					{
						code: '10 06 04',
						description:
							'Sludges and filter cakes from gas cleaning containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '10 06 05',
						description: 'Refractory materials',
						type: 'Non-Hazardous',
					},
					{
						code: '10 06 06',
						description: 'Refractory materials containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '10 06 07',
						description: 'Other casting wastes',
						type: 'Non-Hazardous',
					},
					{
						code: '10 06 09',
						description: 'Non-metalliferous waste',
						type: 'Non-Hazardous',
					},
					{
						code: '10 06 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label:
					'Wastes from thermal metallurgical operations of non-ferrous metals',
				codes: [
					{
						code: '10 07 01',
						description: 'Dust and particles from thermal processes',
						type: 'Non-Hazardous',
					},
					{
						code: '10 07 02',
						description:
							'Dust and particles from thermal processes containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '10 07 03',
						description:
							'Liquid wastes from gas cleaning and treatment containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '10 07 04',
						description: 'Sludges and filter cakes from gas cleaning',
						type: 'Non-Hazardous',
					},
					{
						code: '10 07 05',
						description:
							'Sludges and filter cakes from gas cleaning containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '10 07 06',
						description: 'Refractory materials',
						type: 'Non-Hazardous',
					},
					{
						code: '10 07 07',
						description: 'Refractory materials containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '10 07 08',
						description: 'Other non-metallic waste',
						type: 'Non-Hazardous',
					},
					{
						code: '10 07 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Wastes from heat treatment and tempering operations',
				codes: [
					{
						code: '10 08 04',
						description:
							'Oils and concentrates from cooling and quenching containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '10 08 09',
						description:
							'Wastes from heat-treatment and tempering operations not otherwise specified',
						type: 'Non-Hazardous',
					},
					{
						code: '10 08 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Wastes from cement clinker production and lime production',
				codes: [
					{
						code: '10 09 03',
						description: 'Dust and particles from cement clinker production',
						type: 'Non-Hazardous',
					},
					{
						code: '10 09 07',
						description:
							'Wastes from cleaning of fuel with bases containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '10 09 08',
						description: 'Wastes from cleaning of fuel with bases',
						type: 'Non-Hazardous',
					},
					{
						code: '10 09 09',
						description: 'Wastes from cleaning of power plant chimneys',
						type: 'Non-Hazardous',
					},
					{
						code: '10 09 10',
						description: 'Waste from limestone calcination',
						type: 'Non-Hazardous',
					},
					{
						code: '10 09 11',
						description: 'Waste from slaked lime slurry',
						type: 'Non-Hazardous',
					},
					{
						code: '10 09 12',
						description:
							'Kiln dust from lime production not containing hazardous substances',
						type: 'Non-Hazardous',
					},
					{
						code: '10 09 13',
						description:
							'Kiln dust from lime production containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '10 09 14',
						description: 'Waste from dedusting of flue gas',
						type: 'Non-Hazardous',
					},
					{
						code: '10 09 15',
						description:
							'Other particulates and dust (including hardened cement) from cement clinker production',
						type: 'Non-Hazardous',
					},
					{
						code: '10 09 16',
						description: 'Concrete waste',
						type: 'Non-Hazardous',
					},
					{
						code: '10 09 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Wastes from asbestos-cement production and processing',
				codes: [
					{
						code: '10 10 01',
						description: 'Fibre cement and cement-containing products',
						type: 'Non-Hazardous',
					},
					{
						code: '10 10 02',
						description:
							'Wastes from asbestos-cement production and processing',
						type: 'Hazardous',
					},
					{
						code: '10 10 03',
						description:
							'Wastes from asbestos-cement production and processing',
						type: 'Non-Hazardous',
					},
					{
						code: '10 10 04',
						description: 'Waste from asbestos-cement roofing sheets',
						type: 'Non-Hazardous',
					},
					{
						code: '10 10 05',
						description: 'Asbestos-cement waste',
						type: 'Hazardous',
					},
					{
						code: '10 10 06',
						description:
							'Non-asbestos fibre cement and fibre cement-containing products and waste',
						type: 'Non-Hazardous',
					},
					{
						code: '10 10 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Wastes from waste incineration',
				codes: [
					{
						code: '10 11 03',
						description:
							'Fly ash from waste incineration other than the fly ash mentioned in 10 11 01 and 10 11 02',
						type: 'Non-Hazardous',
					},
					{
						code: '10 11 04',
						description:
							'Bottom ash and slag from waste incineration other than those mentioned in 10 11 01',
						type: 'Non-Hazardous',
					},
					{
						code: '10 11 05',
						description: 'Slag from waste incineration',
						type: 'Non-Hazardous',
					},
					{
						code: '10 11 09',
						description:
							'Gypsum based desulphurisation products from incineration of waste containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '10 11 10',
						description:
							'Gypsum based desulphurisation products from incineration of waste other than those mentioned in 10 11 09',
						type: 'Non-Hazardous',
					},
					{
						code: '10 11 11',
						description:
							'Flue gas cleaning precipitate from incineration of waste containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '10 11 12',
						description:
							'Flue gas cleaning precipitate from incineration of waste other than those mentioned in 10 11 11',
						type: 'Non-Hazardous',
					},
					{
						code: '10 11 13',
						description: 'Fly ash from incineration of hazardous waste',
						type: 'Hazardous',
					},
					{
						code: '10 11 14',
						description:
							'Boiler dust from waste incineration other than the boiler dust mentioned in 10 11 02',
						type: 'Non-Hazardous',
					},
					{
						code: '10 11 15',
						description:
							'Bottom ash, slag and boiler dust from incineration of waste',
						type: 'Non-Hazardous',
					},
					{
						code: '10 11 19',
						description:
							'Flue-gas cleaning residue from municipal waste incineration containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '10 11 20',
						description:
							'Flue-gas cleaning residue from municipal waste incineration other than those mentioned in 10 11 19',
						type: 'Non-Hazardous',
					},
					{
						code: '10 11 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
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
					'Wastes from chemical surface treatment and coating of metals and other materials',
				codes: [
					{
						code: '11 01 05',
						description: 'Pickling liquors and sludges',
						type: 'Hazardous',
					},
					{
						code: '11 01 06',
						description: 'Iron hydroxide sludges from pickling of steel',
						type: 'Hazardous',
					},
					{
						code: '11 01 07',
						description: 'Other sludges from pickling of steel',
						type: 'Hazardous',
					},
					{
						code: '11 01 08',
						description: 'Sludges and filter cakes from gas cleaning',
						type: 'Non-Hazardous',
					},
					{
						code: '11 01 09',
						description:
							'Sludges and filter cakes from gas cleaning containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '11 01 10',
						description: 'Hot-dip galvanising residues',
						type: 'Hazardous',
					},
					{
						code: '11 01 11',
						description:
							'Spent emulsions and solutions from metal degreasing operations',
						type: 'Hazardous',
					},
					{
						code: '11 01 12',
						description: 'Alkaline stripping solutions',
						type: 'Hazardous',
					},
					{
						code: '11 01 13',
						description: 'Degreasing sludges',
						type: 'Hazardous',
					},
					{
						code: '11 01 14',
						description: 'Spent grinding emulsions and solutions',
						type: 'Hazardous',
					},
					{
						code: '11 01 15',
						description: 'Metalworking waste oil-water mixture or emulsion',
						type: 'Non-Hazardous',
					},
					{
						code: '11 01 16',
						description: 'Spent grinding liquors and solutions',
						type: 'Hazardous',
					},
					{
						code: '11 01 17',
						description: 'Metal dust and particles in the metalworking fluid',
						type: 'Hazardous',
					},
					{
						code: '11 01 98',
						description:
							'Wastes from chemical surface treatment and coating containing hazardous substances not otherwise specified',
						type: 'Hazardous',
					},
					{
						code: '11 01 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Wastes from non-ferrous hydro-metallurgy',
				codes: [
					{
						code: '11 02 02',
						description: 'Sludges from copper hydro-metallurgy',
						type: 'Hazardous',
					},
					{
						code: '11 02 05',
						description:
							'Effluent treatment sludges, other than those mentioned in 11 02 03 and 11 02 04',
						type: 'Hazardous',
					},
					{
						code: '11 02 06',
						description:
							'Effluent treatment sludges other than those mentioned in 11 02 02, 11 02 04 and 11 02 05',
						type: 'Non-Hazardous',
					},
					{
						code: '11 02 07',
						description:
							'Waste from roasting and calcination of copper ore concentrates',
						type: 'Hazardous',
					},
					{
						code: '11 02 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label:
					'Wastes from thermal metallurgical operations for non-ferrous metals',
				codes: [
					{
						code: '11 03 02',
						description:
							'Wastes from thermal metallurgical operations of non-ferrous metals containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '11 03 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label:
					'Slags and dust from metallic ore thermal metallurgical operations',
				codes: [
					{
						code: '11 04 01',
						description:
							'Dusts and powder from iron, steel and ferroalloy thermal metallurgical operations containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '11 04 02',
						description:
							'Dusts and powder from iron, steel and ferroalloy thermal metallurgical operations other than those mentioned in 11 04 01',
						type: 'Non-Hazardous',
					},
					{
						code: '11 04 03',
						description:
							'Slags from thermal metallurgical operations of iron, steel and ferroalloys containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '11 04 04',
						description:
							'Slags from thermal metallurgical operations of iron, steel and ferroalloys other than those mentioned in 11 04 03',
						type: 'Non-Hazardous',
					},
					{
						code: '11 04 05',
						description:
							'Dusts from non-ferrous metal thermal metallurgical operations containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '11 04 06',
						description:
							'Dusts from non-ferrous metal thermal metallurgical operations other than those mentioned in 11 04 05',
						type: 'Non-Hazardous',
					},
					{
						code: '11 04 07',
						description:
							'Slags from non-ferrous metal thermal metallurgical operations containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '11 04 08',
						description:
							'Slags from non-ferrous metal thermal metallurgical operations other than those mentioned in 11 04 07',
						type: 'Non-Hazardous',
					},
					{
						code: '11 04 09',
						description:
							'Red mud from alumina production containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '11 04 10',
						description:
							'Red mud from alumina production other than those mentioned in 11 04 09',
						type: 'Non-Hazardous',
					},
					{
						code: '11 04 11',
						description:
							'Dust from thermal metallurgical operations containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '11 04 12',
						description:
							'Dust from thermal metallurgical operations other than those mentioned in 11 04 11',
						type: 'Non-Hazardous',
					},
					{
						code: '11 04 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Wastes from processes and the use of hard metals and carbides',
				codes: [
					{
						code: '11 05 01',
						description:
							'Cobalt dust and dust compounds from hard metal production',
						type: 'Hazardous',
					},
					{
						code: '11 05 02',
						description: 'Sludges and filter cakes from gas cleaning',
						type: 'Hazardous',
					},
					{
						code: '11 05 03',
						description: 'Cobalt-containing wastes',
						type: 'Hazardous',
					},
					{
						code: '11 05 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
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
						description: 'Ferrous metal filings and turning',
						type: 'Non-Hazardous',
					},
					{
						code: '12 01 02',
						description: 'Ferrous metal dust and particles',
						type: 'Non-Hazardous',
					},
					{
						code: '12 01 03',
						description: 'Non-ferrous metal filings and turnings',
						type: 'Non-Hazardous',
					},
					{
						code: '12 01 04',
						description: 'Non-ferrous metal dust and particles',
						type: 'Non-Hazardous',
					},
					{
						code: '12 01 05',
						description: 'Plastic shavings and turnings',
						type: 'Non-Hazardous',
					},
					{
						code: '12 01 13',
						description:
							'Skimmed fat and fatty sludges from metal processing (excluding 12 01 09)',
						type: 'Hazardous',
					},
					{
						code: '12 01 14',
						description:
							'Sludges from metal treatment of metalworking fluids and cooling waters',
						type: 'Hazardous',
					},
					{
						code: '12 01 15',
						description:
							'Sludges from metal treatment of metalworking fluids and cooling waters other than those mentioned in 12 01 14',
						type: 'Non-Hazardous',
					},
					{
						code: '12 01 16',
						description:
							'Spent metalworking fluids and cooling waters containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '12 01 17',
						description:
							'Spent metalworking fluids and cooling waters other than those mentioned in 12 01 16',
						type: 'Non-Hazardous',
					},
					{
						code: '12 01 18',
						description:
							'Spent waxes and fats from metal treatment containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '12 01 19',
						description:
							'Spent waxes and fats from metal treatment other than those mentioned in 12 01 18',
						type: 'Non-Hazardous',
					},
					{
						code: '12 01 20',
						description: 'Non-metalliferous waste',
						type: 'Non-Hazardous',
					},
					{
						code: '12 01 21',
						description:
							'Spent grinding wheels and abrasives containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '12 01 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label:
					'Wastes from physical and mechanical surface treatment of metals and plastics',
				codes: [
					{
						code: '12 02 02',
						description:
							'Wastes from physical and mechanical surface treatment of metals containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '12 02 03',
						description:
							'Wastes from physical and mechanical surface treatment of metals other than those mentioned in 12 02 02',
						type: 'Non-Hazardous',
					},
					{
						code: '12 02 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Wastes from stone working and cutting',
				codes: [
					{
						code: '12 03 01',
						description: 'Waste and scrap from stone working and processing',
						type: 'Non-Hazardous',
					},
					{
						code: '12 03 02',
						description:
							'Sludges and slurries from stone working and processing',
						type: 'Non-Hazardous',
					},
					{
						code: '12 03 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
		],
	},
	{
		id: 13,
		label:
			'OIL WASTES AND WASTES OF LIQUID FUELS (EXCEPT EDIBLE OILS, AND EXCEPT HAZARDOUS WASTES COVERED IN CHAPTER 05)',
		subcategories: [
			{
				label: 'Waste hydraulic oils',
				codes: [
					{
						code: '13 01 01',
						description: 'Hydraulic oils wholly mineral oil-based',
						type: 'Hazardous',
					},
					{
						code: '13 01 04',
						description: 'Hydraulic oils partly or wholly synthetic',
						type: 'Hazardous',
					},
					{
						code: '13 01 05',
						description: 'Hydraulic oils, water-in-oil emulsion',
						type: 'Non-Hazardous',
					},
					{
						code: '13 01 06',
						description:
							'Hydraulic oils, water-in-oil emulsion which does not contain hydrocarbons, halogens or phosphorus organic compounds',
						type: 'Non-Hazardous',
					},
					{
						code: '13 01 07',
						description: 'Hydraulic oils, other emulsions',
						type: 'Non-Hazardous',
					},
					{
						code: '13 01 08',
						description: 'Other hydraulic oils',
						type: 'Non-Hazardous',
					},
					{
						code: '13 01 09',
						description:
							'Mineral oil-based hydraulic fluids which do not contain halogens and phosphorus organic compounds',
						type: 'Non-Hazardous',
					},
					{
						code: '13 01 10',
						description: 'Vegetable oil-based hydraulic fluids',
						type: 'Non-Hazardous',
					},
					{
						code: '13 01 12',
						description: 'Synthetic hydraulic fluids',
						type: 'Non-Hazardous',
					},
					{
						code: '13 01 13',
						description: 'Other hydraulic fluids',
						type: 'Non-Hazardous',
					},
					{
						code: '13 01 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Waste engine, gear and other mineral oils',
				codes: [
					{
						code: '13 02 04',
						description:
							'Mineral oil-based engine, gear and other mineral oil containing halogens (except emulsions and mixtures)',
						type: 'Hazardous',
					},
					{
						code: '13 02 05',
						description:
							'Mineral oil-based engine, gear and other mineral oil highly chlorinated (equal or superior to 10%)',
						type: 'Hazardous',
					},
					{
						code: '13 02 06',
						description:
							'Wholly mineral oil-based engine, gear and other mineral oils',
						type: 'Hazardous',
					},
					{
						code: '13 02 07',
						description:
							'Mineral oil-based engine, gear and other mineral oil partly or wholly synthetic containing halogens',
						type: 'Hazardous',
					},
					{
						code: '13 02 08',
						description:
							'Mineral oil-based engine, gear and other mineral oil partly or wholly synthetic highly chlorinated (equal or superior to 10%)',
						type: 'Hazardous',
					},
					{
						code: '13 02 09',
						description:
							'Mineral oil-based engine, gear and other mineral oil partly or wholly synthetic',
						type: 'Hazardous',
					},
					{
						code: '13 02 10',
						description:
							'Mineral oil-based engine, gear and other oils not containing halogens, highly chlorinated or phosphorus organic compounds',
						type: 'Non-Hazardous',
					},
					{
						code: '13 02 11',
						description: 'Synthetic engine, gear and other mineral oils',
						type: 'Non-Hazardous',
					},
					{
						code: '13 02 12',
						description: 'Vegetable-based engine, gear and other mineral oils',
						type: 'Non-Hazardous',
					},
					{
						code: '13 02 13',
						description: 'Other engine, gear and other mineral oils',
						type: 'Non-Hazardous',
					},
					{
						code: '13 02 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
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
					},
					{
						code: '13 03 02',
						description:
							'Halogenated insulating and heat transmission oils other than those mentioned in 13 03 01',
						type: 'Hazardous',
					},
					{
						code: '13 03 03',
						description:
							'Wholly mineral oil-based insulating and heat transmission oils',
						type: 'Hazardous',
					},
					{
						code: '13 03 04',
						description:
							'Partly or wholly synthetic insulating and heat transmission oils',
						type: 'Hazardous',
					},
					{
						code: '13 03 05',
						description:
							'Insulating and heat transmission oils not containing halogens and highly chlorinated substances or phosphorus organic compounds',
						type: 'Non-Hazardous',
					},
					{
						code: '13 03 06',
						description: 'Synthetic insulating and heat transmission oils',
						type: 'Non-Hazardous',
					},
					{
						code: '13 03 07',
						description:
							'Vegetable-based insulating and heat transmission oils',
						type: 'Non-Hazardous',
					},
					{
						code: '13 03 08',
						description: 'Other insulating and heat transmission oils',
						type: 'Non-Hazardous',
					},
					{
						code: '13 03 09',
						description:
							'Waste water from insulating or heat transmission oils containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '13 03 10',
						description:
							'Waste water from insulating or heat transmission oils not containing hazardous substances',
						type: 'Non-Hazardous',
					},
					{
						code: '13 03 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Waste oils/water, emulsions and mixtures',
				codes: [
					{
						code: '13 04 01',
						description:
							'Oil/water mixture and emulsions from de-icing activities',
						type: 'Hazardous',
					},
					{
						code: '13 04 02',
						description: 'Oil/water mixture and emulsions from road cleaning',
						type: 'Hazardous',
					},
					{
						code: '13 04 03',
						description:
							'Oil/water mixture and emulsions from maintenance activities',
						type: 'Hazardous',
					},
					{
						code: '13 04 07',
						description:
							'Oil/water mixture and emulsions containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '13 04 08',
						description:
							'Oil/water mixtures and emulsions other than those mentioned in 13 04 07',
						type: 'Non-Hazardous',
					},
					{
						code: '13 04 09',
						description: 'Separately collected water',
						type: 'Non-Hazardous',
					},
					{
						code: '13 04 10',
						description: 'Mineral based hydraulic and heat transmission oils',
						type: 'Non-Hazardous',
					},
					{
						code: '13 04 11',
						description: 'Water-in-oil emulsions',
						type: 'Non-Hazardous',
					},
					{
						code: '13 04 12',
						description: 'Synthetic hydraulic and heat transmission oils',
						type: 'Non-Hazardous',
					},
					{
						code: '13 04 13',
						description: 'Vegetable-based hydraulic and heat transmission oils',
						type: 'Non-Hazardous',
					},
					{
						code: '13 04 20',
						description:
							'Oil/water mixture and emulsions in road cleaning containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '13 04 30',
						description:
							'Other oil/water mixture and emulsions not otherwise specified containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '13 04 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Waste cooking oils',
				codes: [
					{
						code: '13 05 02',
						description: 'Waste cooking oils containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '13 05 03',
						description:
							'Waste cooking oils other than those mentioned in 13 05 02',
						type: 'Non-Hazardous',
					},
					{
						code: '13 05 06',
						description: 'Used vegetable oil',
						type: 'Non-Hazardous',
					},
					{
						code: '13 05 07',
						description: 'Waste animal oil',
						type: 'Non-Hazardous',
					},
					{
						code: '13 05 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Other oil wastes',
				codes: [
					{
						code: '13 08 01',
						description: 'Heat-transfer fluids containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '13 08 02',
						description:
							'Heat-transfer fluids other than those mentioned in 13 08 01',
						type: 'Non-Hazardous',
					},
					{
						code: '13 08 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
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
				label: 'Waste organic solvents',
				codes: [
					{
						code: '14 01 01',
						description: 'Chlorofluorocarbon (CFC)',
						type: 'Hazardous',
					},
					{
						code: '14 01 02',
						description: 'HCFC and HFC',
						type: 'Hazardous',
					},
					{
						code: '14 01 03',
						description: 'Other halogenated organic solvents',
						type: 'Hazardous',
					},
					{
						code: '14 01 04',
						description: 'Other organic solvents',
						type: 'Hazardous',
					},
					{
						code: '14 01 05',
						description: 'Waste solvent mixtures',
						type: 'Non-Hazardous',
					},
					{
						code: '14 01 06',
						description: 'Other halogenated organic solvent mixtures',
						type: 'Non-Hazardous',
					},
					{
						code: '14 01 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Waste refrigerants',
				codes: [
					{
						code: '14 02 01',
						description: 'CFC-based refrigerants',
						type: 'Hazardous',
					},
					{
						code: '14 02 02',
						description: 'HCFC-based refrigerants',
						type: 'Hazardous',
					},
					{
						code: '14 02 03',
						description: 'HFC-based refrigerants',
						type: 'Hazardous',
					},
					{
						code: '14 02 04',
						description: 'Other halogenated refrigerants',
						type: 'Hazardous',
					},
					{
						code: '14 02 05',
						description: 'Other refrigerants',
						type: 'Hazardous',
					},
					{
						code: '14 02 06',
						description: 'Refrigerant mixtures',
						type: 'Non-Hazardous',
					},
					{
						code: '14 02 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Other organic solvents and halogenated organic solvents',
				codes: [
					{
						code: '14 03 01',
						description:
							'Other organic solvents and halogenated organic solvents',
						type: 'Hazardous',
					},
					{
						code: '14 03 02',
						description:
							'Waste halogenated solvents and halogenated solvent mixtures',
						type: 'Hazardous',
					},
					{
						code: '14 03 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label:
					'Wastes from organic solvents, refrigerants and propellants (except 07 and 08)',
				codes: [
					{
						code: '14 06 01',
						description: 'Chlorofluorocarbon (CFC) containing waste',
						type: 'Hazardous',
					},
					{
						code: '14 06 02',
						description: 'HCFC containing waste',
						type: 'Hazardous',
					},
					{
						code: '14 06 03',
						description: 'HFC containing waste',
						type: 'Hazardous',
					},
					{
						code: '14 06 04',
						description: 'Other halogenated organic solvent containing waste',
						type: 'Hazardous',
					},
					{
						code: '14 06 05',
						description: 'Other waste',
						type: 'Non-Hazardous',
					},
					{
						code: '14 06 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
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
					},
					{
						code: '15 01 02',
						description: 'Plastic packaging',
						type: 'Non-Hazardous',
					},
					{
						code: '15 01 03',
						description: 'Wooden packaging',
						type: 'Non-Hazardous',
					},
					{
						code: '15 01 04',
						description: 'Metallic packaging',
						type: 'Non-Hazardous',
					},
					{
						code: '15 01 05',
						description: 'Composite packaging',
						type: 'Non-Hazardous',
					},
					{
						code: '15 01 06',
						description: 'Mixed packaging',
						type: 'Non-Hazardous',
					},
					{
						code: '15 01 07',
						description:
							'Packaging containing or contaminated with hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '15 01 08',
						description:
							'Packaging containing residues of or contaminated with hazardous substances',
						type: 'Non-Hazardous',
					},
					{
						code: '15 01 09',
						description: 'Textile packaging',
						type: 'Hazardous',
					},
					{
						code: '15 01 10',
						description:
							'Packaging containing or contaminated with residues of hazardous substances',
						type: 'Non-Hazardous',
					},
					{
						code: '15 01 11',
						description:
							'Metallic packaging containing a hazardous solid porous matrix material (for example asbestos), including hazardous contents',
						type: 'Hazardous',
					},
					{
						code: '15 01 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
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
							'Absorbents, filter materials, wiping cloths and protective clothing contaminated with hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '15 02 03',
						description:
							'Absorbents, filter materials, wiping cloths and protective clothing other than those mentioned in 15 02 02',
						type: 'Non-Hazardous',
					},
					{
						code: '15 02 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
		],
	},
	{
		id: 16,
		label: 'WASTES NOT OTHERWISE SPECIFIED IN THE CATALOGUE',
		subcategories: [
			{
				label:
					'End-of-life vehicles from different means of transport (including off-road machinery) and waste from dismantling of end-of-life vehicles and vehicle maintenance (except 13, 14, 16 06 and 16 08)',
				codes: [
					{
						code: '16 01 04',
						description: 'Waste oils',
						type: 'Hazardous',
					},
					{
						code: '16 01 06',
						description: 'Lead-containing components',
						type: 'Hazardous',
					},
					{
						code: '16 01 07',
						description: 'Asbestos-containing components',
						type: 'Hazardous',
					},
					{
						code: '16 01 08',
						description: 'Components containing mercury',
						type: 'Hazardous',
					},
					{
						code: '16 01 09',
						description:
							'Components containing PCBs (Polychlorinated biphenyls)',
						type: 'Hazardous',
					},
					{
						code: '16 01 10',
						description: 'Ferrous metal',
						type: 'Non-Hazardous',
					},
					{
						code: '16 01 11',
						description: 'Non-ferrous metal',
						type: 'Non-Hazardous',
					},
					{
						code: '16 01 12',
						description: 'Plastics',
						type: 'Non-Hazardous',
					},
					{
						code: '16 01 13',
						description: 'Glass',
						type: 'Non-Hazardous',
					},
					{
						code: '16 01 14',
						description: 'Other components not mentioned above',
						type: 'Hazardous',
					},
					{
						code: '16 01 15',
						description: 'Airbags',
						type: 'Hazardous',
					},
					{
						code: '16 01 16',
						description:
							'Explosive devices such as airbags and seatbelt pre-tensioners',
						type: 'Hazardous',
					},
					{
						code: '16 01 17',
						description: 'Pressurised containers',
						type: 'Hazardous',
					},
					{
						code: '16 01 18',
						description: 'Ferrous metal from shredding',
						type: 'Non-Hazardous',
					},
					{
						code: '16 01 19',
						description:
							'Batteries and accumulators from end-of-life vehicles (except 16 06 01, 16 06 02 and 16 06 03)',
						type: 'Hazardous',
					},
					{
						code: '16 01 20',
						description:
							'Electric/electronic components from end-of-life vehicles',
						type: 'Hazardous',
					},
					{
						code: '16 01 21',
						description:
							'Other components from end-of-life vehicles not otherwise specified',
						type: 'Non-Hazardous',
					},
					{
						code: '16 01 22',
						description: 'Non-ferrous metal from shredding',
						type: 'Non-Hazardous',
					},
					{
						code: '16 01 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Wastes from electrical and electronic equipment',
				codes: [
					{
						code: '16 02 09',
						description: 'Transformers and condensers containing PCBs',
						type: 'Hazardous',
					},
					{
						code: '16 02 10',
						description: 'Liquid or pasty hazardous waste containing PCBs',
						type: 'Hazardous',
					},
					{
						code: '16 02 11',
						description: 'Other liquid and pasty hazardous waste',
						type: 'Hazardous',
					},
					{
						code: '16 02 12',
						description: 'Other liquid and pasty waste',
						type: 'Non-Hazardous',
					},
					{
						code: '16 02 13',
						description: 'Halogenated organic waste',
						type: 'Hazardous',
					},
					{
						code: '16 02 14',
						description: 'Other waste',
						type: 'Non-Hazardous',
					},
					{
						code: '16 02 15',
						description:
							'Hazardous components removed from electrical and electronic waste',
						type: 'Hazardous',
					},
					{
						code: '16 02 16',
						description:
							'Components removed from electrical and electronic waste other than those mentioned in 16 02 15',
						type: 'Non-Hazardous',
					},
					{
						code: '16 02 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Off-specification batches and unused products',
				codes: [
					{
						code: '16 03 03',
						description:
							'Off-specification batches and unused products containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '16 03 04',
						description:
							'Off-specification batches and unused products other than those mentioned in 16 03 03',
						type: 'Non-Hazardous',
					},
					{
						code: '16 03 05',
						description: 'Medicines containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '16 03 06',
						description: 'Medicines other than those mentioned in 16 03 05',
						type: 'Non-Hazardous',
					},
					{
						code: '16 03 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Empty containers',
				codes: [
					{
						code: '16 04 01',
						description:
							'Empty containers containing or contaminated with hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '16 04 02',
						description:
							'Empty containers other than those mentioned in 16 04 01',
						type: 'Non-Hazardous',
					},
					{
						code: '16 04 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Gases in pressure containers and discarded chemicals',
				codes: [
					{
						code: '16 05 04',
						description:
							'Gases in pressure containers containing hazardous substances (including asbestos waste)',
						type: 'Hazardous',
					},
					{
						code: '16 05 06',
						description:
							'Laboratory chemicals comprising or containing hazardous substances, including mixtures of laboratory chemicals',
						type: 'Hazardous',
					},
					{
						code: '16 05 07',
						description:
							'Discarded chemicals other than those mentioned in 16 05 06',
						type: 'Non-Hazardous',
					},
					{
						code: '16 05 08',
						description:
							'Discarded chemical preparations (mixtures) containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '16 05 09',
						description:
							'Discarded chemical preparations other than those mentioned in 16 05 08',
						type: 'Non-Hazardous',
					},
					{
						code: '16 05 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Batteries and accumulators',
				codes: [
					{
						code: '16 06 01',
						description: 'Lead-containing batteries and accumulators',
						type: 'Hazardous',
					},
					{
						code: '16 06 02',
						description: 'Cadmium-containing batteries and accumulators',
						type: 'Hazardous',
					},
					{
						code: '16 06 03',
						description: 'Mercury-containing batteries and accumulators',
						type: 'Hazardous',
					},
					{
						code: '16 06 04',
						description:
							'Alkaline batteries (excluding the wastes mentioned in 16 06 03)',
						type: 'Hazardous',
					},
					{
						code: '16 06 05',
						description: 'Other batteries and accumulators',
						type: 'Non-Hazardous',
					},
					{
						code: '16 06 06',
						description:
							'Batteries and accumulators containing lead or cadmium, sorted for recovery',
						type: 'Non-Hazardous',
					},
					{
						code: '16 06 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Wastes from the handling and disposal of industrial waste',
				codes: [
					{
						code: '16 07 08',
						description:
							'Wastes from remediation of soil and groundwater containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '16 07 09',
						description:
							'Wastes from remediation of soil and groundwater other than those mentioned in 16 07 08',
						type: 'Non-Hazardous',
					},
					{
						code: '16 07 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Waste batteries and accumulators included in chapters 16 06',
				codes: [
					{
						code: '16 08 01',
						description:
							'Waste batteries and accumulators containing mercury-containing button cells, mercuric-oxide batteries',
						type: 'Hazardous',
					},
					{
						code: '16 08 02',
						description:
							'Waste alkaline batteries (excluding the wastes mentioned in 16 08 01)',
						type: 'Hazardous',
					},
					{
						code: '16 08 03',
						description: 'Waste batteries and accumulators containing cadmium',
						type: 'Hazardous',
					},
					{
						code: '16 08 04',
						description: 'Waste nickel-metal hydride batteries',
						type: 'Hazardous',
					},
					{
						code: '16 08 05',
						description: 'Waste lithium batteries',
						type: 'Hazardous',
					},
					{
						code: '16 08 06',
						description: 'Waste lead-acid batteries',
						type: 'Hazardous',
					},
					{
						code: '16 08 07',
						description: 'Waste battery and accumulator cases',
						type: 'Non-Hazardous',
					},
					{
						code: '16 08 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Other wastes not otherwise specified',
				codes: [
					{
						code: '16 09 01',
						description: 'Mineral waste',
						type: 'Non-Hazardous',
					},
					{
						code: '16 09 02',
						description: 'Camphoric waste',
						type: 'Non-Hazardous',
					},
					{
						code: '16 09 04',
						description:
							'Waste resulting from remediation of contaminated land containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '16 09 05',
						description:
							'Wastes resulting from remediation of contaminated land other than those mentioned in 16 09 04',
						type: 'Non-Hazardous',
					},
					{
						code: '16 09 06',
						description:
							'Waste cyanide salts and other cyanide-containing material',
						type: 'Hazardous',
					},
					{
						code: '16 09 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
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
					},
					{
						code: '17 01 02',
						description: 'Bricks',
						type: 'Non-Hazardous',
					},
					{
						code: '17 01 03',
						description: 'Tiles and ceramics',
						type: 'Non-Hazardous',
					},
					{
						code: '17 01 04',
						description:
							'Tiles, bricks and ceramics containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '17 01 05',
						description:
							'Mixtures of concrete, bricks, tiles and ceramics containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '17 01 06',
						description:
							'Mixtures of concrete, bricks, tiles and ceramics other than those mentioned in 17 01 05',
						type: 'Non-Hazardous',
					},
					{
						code: '17 01 07',
						description:
							'Mixtures of waste concrete, bricks, tiles and ceramics',
						type: 'Non-Hazardous',
					},
					{
						code: '17 01 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
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
					},
					{
						code: '17 02 02',
						description: 'Glass',
						type: 'Non-Hazardous',
					},
					{
						code: '17 02 03',
						description: 'Plastics',
						type: 'Non-Hazardous',
					},
					{
						code: '17 02 04',
						description:
							'Wood, glass and plastics containing or contaminated with hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '17 02 05',
						description: 'Asbestos-free material',
						type: 'Non-Hazardous',
					},
					{
						code: '17 02 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
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
					},
					{
						code: '17 03 02',
						description:
							'Bituminous mixtures other than those mentioned in 17 03 01',
						type: 'Hazardous',
					},
					{
						code: '17 03 03',
						description: 'Coal tar and tarred products',
						type: 'Non-Hazardous',
					},
					{
						code: '17 03 04',
						description: 'Bituminous mixture',
						type: 'Non-Hazardous',
					},
					{
						code: '17 03 05',
						description: 'Asphalt',
						type: 'Non-Hazardous',
					},
					{
						code: '17 03 06',
						description: 'Other asphalt',
						type: 'Non-Hazardous',
					},
					{
						code: '17 03 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Metals (including their alloys)',
				codes: [
					{
						code: '17 04 01',
						description: 'Copper, bronze and brass',
						type: 'Non-Hazardous',
					},
					{
						code: '17 04 02',
						description: 'Aluminium',
						type: 'Non-Hazardous',
					},
					{
						code: '17 04 03',
						description: 'Lead',
						type: 'Non-Hazardous',
					},
					{
						code: '17 04 04',
						description: 'Zinc',
						type: 'Non-Hazardous',
					},
					{
						code: '17 04 05',
						description: 'Iron and steel',
						type: 'Non-Hazardous',
					},
					{
						code: '17 04 06',
						description: 'Tin',
						type: 'Non-Hazardous',
					},
					{
						code: '17 04 07',
						description: 'Mixed metals',
						type: 'Non-Hazardous',
					},
					{
						code: '17 04 08',
						description:
							'Metals or metallic compounds contaminated with hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '17 04 09',
						description:
							'Metals or metallic compounds other than those mentioned in 17 04 08',
						type: 'Non-Hazardous',
					},
					{
						code: '17 04 10',
						description: 'Cables excluding those mentioned in 17 04 11',
						type: 'Non-Hazardous',
					},
					{
						code: '17 04 11',
						description:
							'Cables containing oil, coal tar or other hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '17 04 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Soil (including dredged soil), stones and dredging spoil',
				codes: [
					{
						code: '17 05 03',
						description: 'Dredging spoil',
						type: 'Non-Hazardous',
					},
					{
						code: '17 05 04',
						description: 'Dredging spoil containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '17 05 05',
						description: 'Other soil and stones',
						type: 'Non-Hazardous',
					},
					{
						code: '17 05 06',
						description: 'Soil and stones containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '17 05 07',
						description: 'Track ballast waste',
						type: 'Non-Hazardous',
					},
					{
						code: '17 05 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
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
					},
					{
						code: '17 06 03',
						description:
							'Other insulation materials consisting of or containing hazardous substances',
						type: 'Non-Hazardous',
					},
					{
						code: '17 06 04',
						description:
							'Insulation materials other than those mentioned in 17 06 01 and 17 06 03',
						type: 'Non-Hazardous',
					},
					{
						code: '17 06 05',
						description: 'Construction materials containing asbestos',
						type: 'Hazardous',
					},
					{
						code: '17 06 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Mixed construction and demolition wastes',
				codes: [
					{
						code: '17 07 01',
						description:
							'Mixed construction and demolition wastes containing mercury, asbestos or PCBs',
						type: 'Hazardous',
					},
					{
						code: '17 07 02',
						description:
							'Mixed construction and demolition wastes containing hazardous substances other than those mentioned in 17 07 01',
						type: 'Hazardous',
					},
					{
						code: '17 07 03',
						description:
							'Mixed construction and demolition wastes other than those mentioned in 17 07 01 and 17 07 02',
						type: 'Non-Hazardous',
					},
					{
						code: '17 07 04',
						description: 'Mixed construction and demolition wastes',
						type: 'Non-Hazardous',
					},
					{
						code: '17 07 05',
						description:
							'Waste materials (concrete, bricks, tiles and ceramics)',
						type: 'Non-Hazardous',
					},
					{
						code: '17 07 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
		],
	},
	{
		id: 18,
		label:
			'WASTES FROM HUMAN OR ANIMAL HEALTH CARE AND/OR RELATED RESEARCH (EXCEPT KITCHEN AND RESTAURANT WASTES NOT ORIGINATING FROM IMMEDIATE SURROUNDINGS OF HAZARDOUS PROCESSES)',
		subcategories: [
			{
				label:
					'Wastes from natal care, diagnosis, treatment or prevention of disease in humans',
				codes: [
					{
						code: '18 01 01',
						description: 'Sharps in sharps containers',
						type: 'Non-Hazardous',
					},
					{
						code: '18 01 02',
						description: 'Pathological waste',
						type: 'Hazardous',
					},
					{
						code: '18 01 03',
						description: 'Pathological waste',
						type: 'Hazardous',
					},
					{
						code: '18 01 04',
						description:
							'Soiled surgical dressings, plaster casts and other contaminated waste',
						type: 'Hazardous',
					},
					{
						code: '18 01 05',
						description: 'Contaminated waste from dialysis',
						type: 'Hazardous',
					},
					{
						code: '18 01 06',
						description: 'Other chemical waste containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '18 01 07',
						description: 'Other chemical waste',
						type: 'Non-Hazardous',
					},
					{
						code: '18 01 08',
						description: 'Cytotoxic and cytostatic medicines',
						type: 'Hazardous',
					},
					{
						code: '18 01 09',
						description: 'Other hazardous waste',
						type: 'Hazardous',
					},
					{
						code: '18 01 10',
						description: 'Household waste',
						type: 'Non-Hazardous',
					},
					{
						code: '18 01 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label:
					'Wastes from research, diagnosis, treatment or prevention of disease involving animals',
				codes: [
					{
						code: '18 02 01',
						description: 'Sharps in sharps containers',
						type: 'Non-Hazardous',
					},
					{
						code: '18 02 02',
						description: 'Pathological waste',
						type: 'Hazardous',
					},
					{
						code: '18 02 03',
						description: 'Pathological waste',
						type: 'Hazardous',
					},
					{
						code: '18 02 04',
						description:
							'Soiled surgical dressings, plaster casts and other contaminated waste',
						type: 'Hazardous',
					},
					{
						code: '18 02 05',
						description: 'Sharps other than those mentioned in 18 02 01',
						type: 'Hazardous',
					},
					{
						code: '18 02 06',
						description: 'Other chemical waste containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '18 02 07',
						description: 'Other chemical waste',
						type: 'Non-Hazardous',
					},
					{
						code: '18 02 08',
						description: 'Cytotoxic and cytostatic medicines',
						type: 'Hazardous',
					},
					{
						code: '18 02 09',
						description: 'Other hazardous waste',
						type: 'Hazardous',
					},
					{
						code: '18 02 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
		],
	},
	{
		id: 19,
		label:
			'WASTES FROM WASTE MANAGEMENT FACILITIES, OFF-SITE WASTE WATER TREATMENT PLANTS AND THE WASTE WATER INDUSTRY',
		subcategories: [
			{
				label: 'Wastes from incineration of waste',
				codes: [
					{
						code: '19 01 02',
						description:
							'Fly ash from waste incineration containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '19 01 05',
						description:
							'Reaction residues from gas treatment containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '19 01 06',
						description:
							'Reaction residues from gas treatment other than those mentioned in 19 01 05',
						type: 'Non-Hazardous',
					},
					{
						code: '19 01 07',
						description:
							'Solid waste from flue gas cleaning containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '19 01 11',
						description:
							'Bottom ash and slag other than those mentioned in 19 01 12',
						type: 'Non-Hazardous',
					},
					{
						code: '19 01 12',
						description:
							'Bottom ash and slag from waste incineration containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '19 01 13',
						description:
							'Fly ash from waste incineration other than those mentioned in 19 01 02',
						type: 'Non-Hazardous',
					},
					{
						code: '19 01 14',
						description:
							'Boiler dust from waste incineration other than those mentioned in 19 01 02 and 19 01 05',
						type: 'Non-Hazardous',
					},
					{
						code: '19 01 15',
						description: 'Other solid waste from flue gas cleaning',
						type: 'Non-Hazardous',
					},
					{
						code: '19 01 16',
						description:
							'Aqueous liquid wastes from flue gas cleaning containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '19 01 17',
						description:
							'Aqueous liquid wastes from flue gas cleaning other than those mentioned in 19 01 16',
						type: 'Non-Hazardous',
					},
					{
						code: '19 01 18',
						description: 'Waste combustion residues not otherwise specified',
						type: 'Non-Hazardous',
					},
					{
						code: '19 01 19',
						description: 'Calcinated pyrites ash',
						type: 'Hazardous',
					},
					{
						code: '19 01 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label:
					'Wastes from the physical-chemical treatment of waste (including dechromatation, precipitation of heavy metals and emulsion breaking)',
				codes: [
					{
						code: '19 02 03',
						description:
							'Sludge from physico-chemical treatment containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '19 02 04',
						description:
							'Sludge from physico-chemical treatment other than those mentioned in 19 02 03',
						type: 'Non-Hazardous',
					},
					{
						code: '19 02 05',
						description:
							'Sludges from physico-chemical treatment of waste water',
						type: 'Non-Hazardous',
					},
					{
						code: '19 02 06',
						description:
							'Oily sludges from physico-chemical treatment of waste water',
						type: 'Non-Hazardous',
					},
					{
						code: '19 02 07',
						description: 'Waste from hot-melt operations',
						type: 'Non-Hazardous',
					},
					{
						code: '19 02 08',
						description: 'Waste from flue gas cleaning',
						type: 'Hazardous',
					},
					{
						code: '19 02 09',
						description: 'Salt and their solutions',
						type: 'Non-Hazardous',
					},
					{
						code: '19 02 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Wastes from stabilisation/solidification',
				codes: [
					{
						code: '19 03 04',
						description: 'Waste solidified with asphalt',
						type: 'Hazardous',
					},
					{
						code: '19 03 05',
						description: 'Waste solidified with cement or lime',
						type: 'Hazardous',
					},
					{
						code: '19 03 06',
						description: 'Waste solidified with other binders',
						type: 'Hazardous',
					},
					{
						code: '19 03 07',
						description:
							'Solidified waste other than those mentioned in 19 03 04, 19 03 05 and 19 03 06',
						type: 'Non-Hazardous',
					},
					{
						code: '19 03 08',
						description: 'Other solidified waste',
						type: 'Non-Hazardous',
					},
					{
						code: '19 03 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Wastes from aerobic treatment of sludge',
				codes: [
					{
						code: '19 04 01',
						description: 'Composted sludge',
						type: 'Non-Hazardous',
					},
					{
						code: '19 04 02',
						description: 'Composted waste',
						type: 'Non-Hazardous',
					},
					{
						code: '19 04 03',
						description: 'Compost',
						type: 'Non-Hazardous',
					},
					{
						code: '19 04 04',
						description: 'Compost',
						type: 'Non-Hazardous',
					},
					{
						code: '19 04 05',
						description: 'Compost from waste water treatment',
						type: 'Non-Hazardous',
					},
					{
						code: '19 04 06',
						description: 'Other compost',
						type: 'Non-Hazardous',
					},
					{
						code: '19 04 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Wastes from the mechanical (biological) treatment of waste',
				codes: [
					{
						code: '19 05 01',
						description: 'Compost from the mechanical treatment of waste',
						type: 'Non-Hazardous',
					},
					{
						code: '19 05 02',
						description:
							'Refuse derived fuel from the mechanical treatment of waste',
						type: 'Non-Hazardous',
					},
					{
						code: '19 05 03',
						description:
							'Hazardous wastes from mechanical treatment of waste containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '19 05 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Wastes from the anaerobic treatment of waste',
				codes: [
					{
						code: '19 06 03',
						description: 'Compost from the anaerobic treatment of waste',
						type: 'Non-Hazardous',
					},
					{
						code: '19 06 04',
						description: 'Biogas from anaerobic treatment of waste',
						type: 'Non-Hazardous',
					},
					{
						code: '19 06 05',
						description:
							'Waste from biogas cleaning containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '19 06 06',
						description:
							'Waste from biogas cleaning other than those mentioned in 19 06 05',
						type: 'Non-Hazardous',
					},
					{
						code: '19 06 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label: 'Leachate from waste',
				codes: [
					{
						code: '19 07 02',
						description: 'Leachate containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '19 07 03',
						description: 'Leachate other than those mentioned in 19 07 02',
						type: 'Non-Hazardous',
					},
					{
						code: '19 07 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
			{
				label:
					'Wastes from other waste treatment activities (including flue gas cleaning and waste water treatment)',
				codes: [
					{
						code: '19 08 01',
						description: 'Sludges from cooling and cleaning of waste',
						type: 'Non-Hazardous',
					},
					{
						code: '19 08 02',
						description: 'Waste from desanding',
						type: 'Non-Hazardous',
					},
					{
						code: '19 08 05',
						description: 'Sludges from treatment of urban waste water',
						type: 'Non-Hazardous',
					},
					{
						code: '19 08 06',
						description: 'Saturated or spent ion exchange resins',
						type: 'Hazardous',
					},
					{
						code: '19 08 07',
						description:
							'Solutions and sludges from regeneration of ion exchangers',
						type: 'Hazardous',
					},
					{
						code: '19 08 08',
						description: 'Membrane system waste containing heavy metals',
						type: 'Hazardous',
					},
					{
						code: '19 08 09',
						description:
							'Grease and oil mixture from oil/water separation containing only edible oil and fats',
						type: 'Non-Hazardous',
					},
					{
						code: '19 08 10',
						description:
							'Grease and oil mixture from oil/water separation other than those mentioned in 19 08 09',
						type: 'Hazardous',
					},
					{
						code: '19 08 11',
						description:
							'Sludges containing hazardous substances from biological treatment of industrial waste water',
						type: 'Hazardous',
					},
					{
						code: '19 08 12',
						description:
							'Sludges from biological treatment of industrial waste water other than those mentioned in 19 08 11',
						type: 'Non-Hazardous',
					},
					{
						code: '19 08 13',
						description:
							'Sludges containing hazardous substances from other treatment of industrial waste water',
						type: 'Hazardous',
					},
					{
						code: '19 08 14',
						description:
							'Sludges from other treatment of industrial waste water other than those mentioned in 19 08 13',
						type: 'Non-Hazardous',
					},
					{
						code: '19 08 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
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
					},
					{
						code: '19 09 02',
						description: 'Sludges from water clarification',
						type: 'Non-Hazardous',
					},
					{
						code: '19 09 03',
						description: 'Sludges from decarbonation',
						type: 'Non-Hazardous',
					},
					{
						code: '19 09 04',
						description: 'Spent activated carbon',
						type: 'Non-Hazardous',
					},
					{
						code: '19 09 05',
						description: 'Saturated or spent ion exchange resins',
						type: 'Non-Hazardous',
					},
					{
						code: '19 09 06',
						description:
							'Solutions and sludges from regeneration of ion exchangers',
						type: 'Non-Hazardous',
					},
					{
						code: '19 09 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
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
					},
					{
						code: '19 10 02',
						description: 'Non-ferrous waste',
						type: 'Non-Hazardous',
					},
					{
						code: '19 10 03',
						description:
							'Fluff-light fraction and dust containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '19 10 04',
						description:
							'Fluff-light fraction and dust other than those mentioned in 19 10 03',
						type: 'Non-Hazardous',
					},
					{
						code: '19 10 05',
						description: 'Other fractions containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '19 10 06',
						description:
							'Other fractions other than those mentioned in 19 10 05',
						type: 'Non-Hazardous',
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
					},
					{
						code: '19 11 02',
						description: 'Acid tars',
						type: 'Hazardous',
					},
					{
						code: '19 11 03',
						description: 'Aqueous liquid wastes',
						type: 'Hazardous',
					},
					{
						code: '19 11 04',
						description: 'Wastes from cleaning of fuel with bases',
						type: 'Hazardous',
					},
					{
						code: '19 11 05',
						description:
							'Sludges from on-site effluent treatment containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '19 11 06',
						description:
							'Sludges from on-site effluent treatment other than those mentioned in 19 11 05',
						type: 'Non-Hazardous',
					},
					{
						code: '19 11 07',
						description: 'Wastes from flue-gas cleaning',
						type: 'Hazardous',
					},
					{
						code: '19 11 99',
						description: 'Wastes not otherwise specified',
						type: 'Non-Hazardous',
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
					},
					{
						code: '19 12 02',
						description: 'Ferrous metal',
						type: 'Non-Hazardous',
					},
					{
						code: '19 12 03',
						description: 'Non-ferrous metal',
						type: 'Non-Hazardous',
					},
					{
						code: '19 12 04',
						description: 'Plastic and rubber',
						type: 'Non-Hazardous',
					},
					{
						code: '19 12 05',
						description: 'Glass',
						type: 'Non-Hazardous',
					},
					{
						code: '19 12 06',
						description: 'Wood containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '19 12 07',
						description: 'Wood other than that mentioned in 19 12 06',
						type: 'Non-Hazardous',
					},
					{
						code: '19 12 08',
						description: 'Textiles',
						type: 'Non-Hazardous',
					},
					{
						code: '19 12 09',
						description: 'Minerals (for example sand, stones)',
						type: 'Non-Hazardous',
					},
					{
						code: '19 12 10',
						description: 'Combustible waste (refuse derived fuel)',
						type: 'Non-Hazardous',
					},
					{
						code: '19 12 11',
						description:
							'Other wastes (including mixtures of materials) from mechanical treatment of waste containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '19 12 12',
						description:
							'Other wastes (including mixtures of materials) from mechanical treatment of wastes other than those mentioned in 19 12 11',
						type: 'Non-Hazardous',
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
					},
					{
						code: '19 13 02',
						description:
							'Solid wastes from soil remediation other than those mentioned in 19 13 01',
						type: 'Non-Hazardous',
					},
					{
						code: '19 13 03',
						description:
							'Sludges from soil remediation containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '19 13 04',
						description:
							'Sludges from soil remediation other than those mentioned in 19 13 03',
						type: 'Non-Hazardous',
					},
					{
						code: '19 13 05',
						description:
							'Sludges from groundwater remediation containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '19 13 06',
						description:
							'Sludges from groundwater remediation other than those mentioned in 19 13 05',
						type: 'Non-Hazardous',
					},
					{
						code: '19 13 07',
						description:
							'Aqueous liquid wastes and aqueous concentrates from groundwater remediation containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '19 13 08',
						description:
							'Aqueous liquid wastes and aqueous concentrates from groundwater remediation other than those mentioned in 19 13 07',
						type: 'Non-Hazardous',
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
					},
					{
						code: '20 01 02',
						description: 'Glass',
						type: 'Non-Hazardous',
					},
					{
						code: '20 01 08',
						description: 'Biodegradable kitchen and canteen waste',
						type: 'Non-Hazardous',
					},
					{
						code: '20 01 10',
						description: 'Clothes',
						type: 'Non-Hazardous',
					},
					{
						code: '20 01 11',
						description: 'Textiles',
						type: 'Non-Hazardous',
					},
					{
						code: '20 01 13',
						description: 'Solvents',
						type: 'Hazardous',
					},
					{
						code: '20 01 14',
						description: 'Acids',
						type: 'Hazardous',
					},
					{
						code: '20 01 15',
						description: 'Alkalines',
						type: 'Hazardous',
					},
					{
						code: '20 01 17',
						description: 'Photochemicals',
						type: 'Hazardous',
					},
					{
						code: '20 01 19',
						description: 'Pesticides',
						type: 'Hazardous',
					},
					{
						code: '20 01 21',
						description: 'Fluorescent tubes and other mercury-containing waste',
						type: 'Hazardous',
					},
					{
						code: '20 01 23',
						description: 'Discarded equipment containing chlorofluorocarbons',
						type: 'Hazardous',
					},
					{
						code: '20 01 25',
						description: 'Edible oil and fat',
						type: 'Non-Hazardous',
					},
					{
						code: '20 01 26',
						description: 'Oil and fat other than those mentioned in 20 01 25',
						type: 'Hazardous',
					},
					{
						code: '20 01 27',
						description:
							'Paint, inks, adhesives and resins containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '20 01 28',
						description:
							'Paint, inks, adhesives and resins other than those mentioned in 20 01 27',
						type: 'Non-Hazardous',
					},
					{
						code: '20 01 29',
						description: 'Detergents containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '20 01 30',
						description: 'Detergents other than those mentioned in 20 01 29',
						type: 'Non-Hazardous',
					},
					{
						code: '20 01 31',
						description: 'Cytotoxic and cytostatic medicines',
						type: 'Hazardous',
					},
					{
						code: '20 01 32',
						description: 'Medicines other than those mentioned in 20 01 31',
						type: 'Non-Hazardous',
					},
					{
						code: '20 01 33',
						description:
							'Batteries and accumulators included in 16 06 01, 16 06 02 or 16 06 03 and unsorted batteries and accumulators containing these batteries',
						type: 'Hazardous',
					},
					{
						code: '20 01 34',
						description:
							'Batteries and accumulators other than those mentioned in 20 01 33',
						type: 'Non-Hazardous',
					},
					{
						code: '20 01 35',
						description:
							'Discarded electrical and electronic equipment other than those mentioned in 20 01 21 and 20 01 23 containing hazardous components (3)',
						type: 'Hazardous',
					},
					{
						code: '20 01 36',
						description:
							'Discarded electrical and electronic equipment other than those mentioned in 20 01 21, 20 01 23 and 20 01 35',
						type: 'Non-Hazardous',
					},
					{
						code: '20 01 37',
						description: 'Wood containing hazardous substances',
						type: 'Hazardous',
					},
					{
						code: '20 01 38',
						description: 'Wood other than that mentioned in 20 01 37',
						type: 'Non-Hazardous',
					},
					{
						code: '20 01 39',
						description: 'Plastics',
						type: 'Non-Hazardous',
					},
					{
						code: '20 01 40',
						description: 'Metals',
						type: 'Non-Hazardous',
					},
					{
						code: '20 01 41',
						description: 'Wastes from chimney sweeping',
						type: 'Non-Hazardous',
					},
					{
						code: '20 01 99',
						description: 'Other fractions not otherwise specified',
						type: 'Non-Hazardous',
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
					},
					{
						code: '20 02 02',
						description: 'Soil and stones',
						type: 'Non-Hazardous',
					},
					{
						code: '20 02 03',
						description: 'Other non-biodegradable wastes',
						type: 'Non-Hazardous',
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
					},
					{
						code: '20 03 02',
						description: 'Waste from markets',
						type: 'Non-Hazardous',
					},
					{
						code: '20 03 03',
						description: 'Street-cleaning residues',
						type: 'Non-Hazardous',
					},
					{
						code: '20 03 04',
						description: 'Septic tank sludge',
						type: 'Non-Hazardous',
					},
					{
						code: '20 03 06',
						description: 'Waste from sewage cleaning',
						type: 'Non-Hazardous',
					},
					{
						code: '20 03 07',
						description: 'Bulky waste',
						type: 'Non-Hazardous',
					},
					{
						code: '20 03 99',
						description: 'Municipal wastes not otherwise specified',
						type: 'Non-Hazardous',
					},
				],
			},
		],
	},
]

export default EWC

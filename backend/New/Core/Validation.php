<?php

class Validation
{
	/*
	*	Description: Checks if provided array has specified key
	* ReturnValue: Boolean
	*/
	public function hasKey($array, $key): bool
	{
		if (array_key_exists($key, $array)) {
			return true;
		} else {
			return false;
		}
	}

	/*
	*	Description: 
	* Checks if provided array has specified key and checks if data
	* Held by the key is valid by the predetermined results passed in
	* ReturnValue: Boolean
	*/
	public function hasKeyWithValidData($array, $key, $validData): bool
	{
		$hasKeyWithValidData = false;
		if (is_array($validData)) {
			foreach ($validData as $value) {
				if (!$this->hasKey($array, $key)) return false;
				if ($array[$key] === $value) $hasKeyWithValidData = true;
			}
		} else {
			if (!$this->hasKey($array, $key)) return false;
			if ($array[$key] === $validData) $hasKeyWithValidData = true;
		}
		return $hasKeyWithValidData;
	}

	/*
	*	Description: Checks if provided data matches defined schema
	* ReturnValue: Boolean
	*/
	public function hasValidStructure($data, $schema): bool
	{
		$SameKeyCount = 0;
		if (count($data) < count($schema)) return false;
		foreach ($schema as $key => $value) {
			if (array_key_exists($key, $data)) $SameKeyCount += 1;
		}
		if (count($schema) === $SameKeyCount) return true;

		return false;
	}

	/*
	*	Description: Removes any extra data thats not defined in the schema
	* ReturnValue: inseted data with extra fields removed or false
	*/
	public function cleanValidStructure($data, $schema)
	{
		$validData = new stdClass();

		$data = (array) $data;
		$schema = (array) $schema;
		$result = $this->hasValidStructure($data, $schema);
		if ($result === false) return false;

		foreach ($schema as $key => $value) {
			$validData->$key = $data[$key];
		}

		return $validData;
	}
}

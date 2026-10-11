-- Review and resolve duplicate normalized addresses manually before re-running:
-- SELECT lower(regexp_replace(email, '^[[:space:]]+|[[:space:]]+$', '', 'g')) AS normalized_email,
--        count(*)
-- FROM public.provider_interests
-- WHERE email IS NOT NULL
-- GROUP BY 1
-- HAVING count(*) > 1;

DO $$
DECLARE
  duplicate_groups integer;
BEGIN
  SELECT count(*)
  INTO duplicate_groups
  FROM (
    SELECT lower(regexp_replace(email, '^[[:space:]]+|[[:space:]]+$', '', 'g'))
    FROM public.provider_interests
    WHERE email IS NOT NULL
    GROUP BY 1
    HAVING count(*) > 1
  ) duplicates;

  IF duplicate_groups > 0 THEN
    RAISE EXCEPTION
      'Cannot enforce unique provider emails: found % duplicate normalized email group(s). Review the diagnostic query at the top of this migration and resolve them manually; no records were deleted.',
      duplicate_groups;
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.normalize_provider_interest_email()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  NEW.email := pg_catalog.lower(
    pg_catalog.regexp_replace(NEW.email, '^[[:space:]]+|[[:space:]]+$', '', 'g')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER normalize_provider_interest_email
BEFORE INSERT OR UPDATE OF email ON public.provider_interests
FOR EACH ROW
EXECUTE FUNCTION public.normalize_provider_interest_email();

UPDATE public.provider_interests
SET email = lower(regexp_replace(email, '^[[:space:]]+|[[:space:]]+$', '', 'g'))
WHERE email IS DISTINCT FROM lower(regexp_replace(email, '^[[:space:]]+|[[:space:]]+$', '', 'g'));

CREATE UNIQUE INDEX provider_interests_normalized_email_uidx
ON public.provider_interests (email);

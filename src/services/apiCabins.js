import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log(newCabin);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  console.log(hasImagePath);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //https://grqtxevyqycnnhjcozpe.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg?t=2024-07-31T09%3A17%3A31.590Z

  //1.) Create/edit Cabin
  let query = supabase.from("cabins");

  // A) CREATE CABIN QUERY
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  // B) EDIT CABIN QUERY

  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("New Cabin could not be created");
  }

  //2.) Upload the image

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3.) Delete the Cabin IF there was an error uploading the corrosponding error

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Cabin image could not be uploaded and the cabin was not created");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin cannot be deleted");
  }

  return data;
}
